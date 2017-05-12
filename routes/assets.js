'use strict';

var router = require('express').Router();
var logger = require('../lib/utils/log');
var assetQueryModel = require('../model/AssetQueryModel');
var deviceRecentAlertModel = require('../model/DeviceRecentAlertsModel');
var assetService = require('../lib/restclient/dashboard/asset');
var path = require("path");
var deviceAlertModel = require(path.resolve('./model/DeviceAlertModel'));
var urlDecoder = require('../lib/utils/urldecoder');

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/assets', function (req, res, next) {
    var queryModel = new assetQueryModel();
    var url = "";
    if(req.query.eid) {
        queryModel.eid = req.params.eid;
    }
    if(req.query.did) {
        queryModel.dId = req.query.did;
        url += queryModel.dId + "/devices?";
    }
    if(req.query.ty) {
        queryModel.at = req.query.ty;
        url += "&typ=" + queryModel.at;
    }
    if(req.query.ws) {
        queryModel.ws = req.query.ws;
        url += "&ws=" + queryModel.ws;
    }
    if(req.query.at) {
        queryModel.at = req.query.at;
        url += "&aType=" + queryModel.at;
    }
    if(req.query.dur) {
        queryModel.dur = req.query.dur;
        url += "&dur=" + queryModel.dur;
    }
    if(req.query.awr) {
        queryModel.awr = req.query.awr;
        url += "&awr=" + queryModel.awr;
    }
    queryModel.size = req.query.size ? req.query.size : 50;
    var offset = req.query.o ? req.query.o : 0;
    queryModel.page = (parseInt(offset) / parseInt(queryModel.size)) + 1;
    url += "&page=" + queryModel.page + "&size=" + queryModel.size;
    if(!req.header("Authorization")) {
       res.status(401).send("Basic authorization required");
    }
    queryModel.auth = req.header("Authorization");
    queryModel.reqId = req.headers("x-request-id");
    assetService.getAssetsForDomain(queryModel,url, function (err, data) {
        if(err) {
            logger.error("Error while fetching the list of assets");
            next(err);
        } else if(data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });

});

router.get('/assets/alerts/recent/:vId/:dId', function (req, res, next) {
    var queryModel = new assetQueryModel();
    queryModel.vId = req.params.vId;
    queryModel.dId = req.params.dId;
    queryModel.page = req.query.page;
    queryModel.size = req.query.size;
    queryModel.token = req.header("x-access-token");
    queryModel.reqId = req.headers("x-request-id");
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
