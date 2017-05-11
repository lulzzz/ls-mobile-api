'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    urldecoder = require('../lib/utils/urlDecoder'),
    dashinv = require('../lib/restclient/dashboard/dashboardinv.js'),
    assetDashboard = require('../lib/restclient/dashboard/assetOverviewDashboard.js'),
    dashinvdetail = require('../lib/restclient/dashboard/dashboardinvdetail.js'),
    assetQueryModel = require('../model/assetDashboardQueryModel'),
    assetModel = require('../model/DashboardModel'),
    overviewDashboard = require('../model/OverAllDashboard'),
    InvDashQueryModel = require('../model/InvDashQueryModel');


router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeURL(req);
    return next();
});

router.get('/dashboards/inventory', function (req, res, next) {

    var queryModel = new InvDashQueryModel();
    queryModel.dId = req.query.dId;
    queryModel.incetags = req.query.incetags;
    queryModel.exetags = req.query.exetags;
    queryModel.mtags = req.query.mtags;
    queryModel.mnm = req.query.mnm;
    queryModel.loc = req.query.loc;
    queryModel.locty = req.query.locty;
    queryModel.p = req.query.p;
    queryModel.date = req.query.date;
    queryModel.refresh = req.query.refresh;

    dashinv.getInvDashboard(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory dashboard: ' + err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});


router.get('/dashboards/assets', function (req, res, next) {
    var queryModel = new assetQueryModel();
    queryModel.excludeETag = req.query.excludeETag;
    queryModel.skipCache = req.query.refresh;
    queryModel.tPeriod = "D_0";
    queryModel.onlyTempData = true;
    queryModel.user = req.headers['x-access-user'];
    queryModel.reqId = req.headers['x-request-id'];
    assetDashboard.getAssetDashboard(queryModel, function (err, data) {
        if (err) {
            logger.error('Error in getting asset overview dashboard' + err.message);
            next(err);
        } else if (data != null) {
            var obj = JSON.parse(data);
            var model = new overviewDashboard();
            var value = obj.tempDomain;
            model.tn = value.tn != null ? value.tn : 0;
            model.th = value.th != null ? value.th : 0;
            model.tu = value.tu != null ? value.tu : 0;
            model.tl = value.tl != null ? value.tl : 0;
            model.tc = model.tn + model.th + model.tu + model.tl;
            model.restime = null;
            res.append('Content-Type', 'application/json');
            res.status(200).send(model);
        }
    });
});

router.get('/dashboards/inventory/detail', function (req, res, next) {

    var queryModel = new InvDashQueryModel();
    queryModel.dId = req.query.dId;
    queryModel.incetags = req.query.incetags;
    queryModel.exetags = req.query.exetags;
    queryModel.mtags = req.query.mtags;
    queryModel.mnm = req.query.mnm;
    queryModel.loc = req.query.loc;
    queryModel.locty = req.query.locty;
    queryModel.p = req.query.p;
    queryModel.date = req.query.date;
    queryModel.refresh = req.query.refresh;
    queryModel.groupby = req.query.groupby;

    dashinvdetail.getInvDetailDashboard(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory detail dashboard: ' + err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});

router.get('/dashboards/assets/detail', function (req, res, next) {
    var queryModel = new assetQueryModel();
    queryModel.locnm = req.query.locnm;
    queryModel.level = req.query.locty;
    queryModel.aType = req.query.ty;
    queryModel.tPeriod = req.query.p;
    queryModel.excludeETag = req.query.excludeETag;
    queryModel.skipCache = req.query.refresh;
    queryModel.onlyTempData = true;
    queryModel.size = req.query.size;
    queryModel.offset = req.query.offset;
    queryModel.user = req.headers['x-access-user'];
    queryModel.reqId = req.headers['x-request-id'];

    assetDashboard.getAssetDashboard(queryModel, function (err, data) {
        if (err) {
            logger.error('Error in getting asset detail dashboard: ' + err.message);
            next(err);
        } else if (data != null) {
            var obj = JSON.parse(data);
            var model = new assetModel();
            var tempData = obj.tempDomain;
            model.tn = tempData.tn != null ? tempData.tn : 0;
            model.th = tempData.th != null ? tempData.th : 0;
            model.tu = tempData.tu != null ? tempData.tu : 0;
            model.tl = tempData.tl != null ? tempData.tl : 0;
            model.tc = model.tn + model.th + model.tu + model.tl;
            model.restime = null;
            model.l = obj.mLev;
            model.sz = obj.size;
            var eventKeys = Object.keys(obj.temp);
            for (var i = 0; i < eventKeys.length; i++) {
                var evntTempData = obj.temp[eventKeys[i]];
                var locKeys = Object.keys(evntTempData);
                var locTempData = Object.values(evntTempData);
                if (locKeys != null) {
                    for (var c = 0; c < locTempData.length; c++) {
                        locTempData[c].lcid = locKeys[c];
                        locTempData[c].lcnm = locKeys[c];
                    }
                }
                evntTempData = locTempData;
                obj.temp[eventKeys[i]] = evntTempData;
            }
            model.items = obj.temp;
            res.append('Content-Type', 'application/json');
            res.status(200).send(model);
        }
    });
});

module.exports = router;
