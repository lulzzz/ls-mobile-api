'use strict';

var router = require('express').Router();
var logger = require('../lib/utils/log');
var assetQueryModel = require('../model/AssetQueryModel');
var deviceRecentAlertModel = require('../model/DeviceRecentAlertsModel');
var assetService = require('../lib/restclient/dashboard/asset');
var path = require("path");
var deviceAlertModel = require(path.resolve('./model/DeviceAlertModel'));
var urlDecoder = require('../lib/utils/urlDecoder');

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeURL(req);
    return next();
});

router.get('/assets/alerts/recent/:vId/:dId', function (req, res, next) {
    debugger
    var queryModel = new assetQueryModel();
    queryModel.vId = req.params.vId;
    queryModel.dId = req.params.dId;
    queryModel.page = req.query.page;
    queryModel.size = req.query.size;
    queryModel.token = req.header("x-access-token");
    assetService.getAssetsForDomain(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error("Error while fetching the alerts for assets");
            next(err);
        }
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
    });


});

module.exports = router;
