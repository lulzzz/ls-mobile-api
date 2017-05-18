'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    assetQueryModel = require('../model/AssetQueryModel'),
    deviceRecentAlertModel = require('../model/DeviceRecentAlertsModel'),
    assetService = require('../lib/restclient/assets/asset'),
    deviceAlertModel = require('../model/DeviceAlertModel'),
    urlDecoder = require('../lib/utils/urldecoder'),
    assetBuilder = require('../builder/assetRespBuilder'),
    queryBuilder = require('../builder/assetQueryBuilder');

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/assets', function (req, res, next) {
    var model = queryBuilder.buildTempDataParams(req);
    assetService.getAssetsForDomain(model, function (err, data) {
        if (err) {
            logger.error("Error while fetching the list of assets");
            next(err);
        } else if (data) {
            var obj = JSON.parse(data);
            var asset = [];
            var tempData = obj.data;
            tempData.forEach(function (data) {
                var assetData = [];
                assetData.push(data.vId);
                assetData.push(data.dId);
                asset.push(assetData);
            });
            model = queryBuilder.buildAssetListingParams(req, asset);
            assetService.getAssetsListingsData(model, function (err, data) {
                if (err) {
                    logger.error("Error while fetching the data");
                    next(err);
               } else if(data) {
                   var assetData = JSON.parse(data);
                   var assets = assetBuilder.buildAssetData(assetData, tempData, model.offset);
                   res.append('Content-Type', 'application/json');
                   res.status(200).send(assets);
               }
            });
        }
    });

});

router.get('/assets/detail', function (req, res, next) {
    var queryModel = new assetQueryModel();
    queryModel.vId = req.params.vId;
    queryModel.dId = req.params.dId;
    queryModel.page = req.query.page;
    queryModel.size = req.query.size;
    queryModel.token = req.header("x-access-token");
    queryModel.reqId = req.header("x-request-id");
    assetService.getRecentAlerts(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error("Error while fetching the alerts for assets");
            next(err);
        } else if (data) {
            var obj = JSON.parse(data);
            var alertModel = new deviceRecentAlertModel();
            obj.data.forEach(function (assetData) {
                var deviceModel = new deviceAlertModel();
                deviceModel.ft = assetData.ft;
                deviceModel.st = assetData.tmpalm.st;
                deviceModel.mpId = assetData.tmpalm.mpId;
                deviceModel.temp = assetData.tmpalm.tmp;
                alertModel.items.push(deviceModel);
            });
            alertModel.nPages = obj.nPages;
            alertModel.size = obj.data.length;
            res.append('Content-Type', 'application/json');
            res.status(200).send(alertModel);
        }
    });


});

module.exports = router;
