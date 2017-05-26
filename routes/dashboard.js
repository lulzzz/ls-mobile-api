'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    urlDecoder = require('../lib/utils/urldecoder'),
    dashboardService = require('../lib/restclient/dashboard/dashboardService'),
    InvDashQueryModel = require('../model/InvDashQueryModel'),
    InvDetailResModel = require('../model/InvDetailResModel'),
    queryBuilder = require('../lib/builder/dashboardQueryBuilder'),
    dashboardResModel = require('../lib/builder/dashboardResBuilder');


router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/dashboards/inventory', function (req, res, next) {

    var queryModel = new InvDashQueryModel();
    queryModel.incetags = req.query.incetags;
    queryModel.exetags = req.query.exetags;
    queryModel.mtags = req.query.mtags;
    queryModel.mnm = req.query.mnm;
    queryModel.loc = req.query.loc;
    queryModel.locty = req.query.locty;
    queryModel.p = req.query.p;
    queryModel.date = req.query.date;
    queryModel.refresh = req.query.refresh;
    queryModel.user = req.headers['x-access-user'];
    queryModel.reqId = req.headers['x-request-id'];

    dashboardService.getInvDashboard(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory dashboard: ' + err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
        res.status(400).send("Error while fetching the inventory dashboard");
    });
});


router.get('/dashboards/assets', function (req, res, next) {
    var model = queryBuilder.buildAssetDashboardParams(req);
    dashboardService.getAssetDashboard(model, function (err, data) {
        if (err) {
            logger.error('Error in getting asset overview dashboard' + err.message);
            next(err);
        } else if (data != null) {
            var tempData = JSON.parse(data);
            model = dashboardResModel.buildAssetDashboardModel(tempData);
            res.append('Content-Type', 'application/json');
            res.status(200).send(model);
        }
        res.status(400).send("Error while fetching dashboard data");
    });
});

router.get('/dashboards/inventory/detail', function (req, res, next) {

    var queryModel = new InvDashQueryModel();
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
    queryModel.user = req.headers['x-access-user'];
    queryModel.reqId = req.headers['x-request-id'];

    dashboardService.getInvDetailDashboard(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory detail dashboard: ' + err.message)
            next(err);
        } else if (data) {
            var v = transformInvDetailResponse(data);
            res.append('Content-Type', 'application/json');
            res.status(200).send(v);
        }
        res.status(400).send("Error while fetching inventory detail dashboard");
    });
    function transformInvDetailResponse(data) {
    var d = JSON.parse(data);
    var resmodel = new InvDetailResModel();
    if (d.items instanceof Array) {
        for (var i in d.items) {
            var item = d.items[i];
            if (item.nc != undefined && item.nc > 0) {
                resmodel.n.push(item);
            }
            if (item.soc != undefined && item.soc > 0) {
                resmodel.so.push(item);
            }
            if (item.gmc != undefined && item.gmc > 0) {
                resmodel.mx.push(item);
            }
            if (item.lmnc != undefined && item.lmnc > 0) {
                resmodel.mn.push(item);
            }
        }
    }
    if (d.total != undefined) {
        resmodel.total = d.total;
    }
    if (d.offset != undefined) {
        resmodel.offset = d.offset;
    }
    if (d.size != undefined) {
        resmodel.size = d.size;
    }
    if (d.level != undefined) {
        resmodel.l = d.level;
    }
    return resmodel;
}
});

router.get('/dashboards/assets/detail', function (req, res, next) {
    var model = queryBuilder.buildAssetDashboardParams(req);
    dashboardService.getAssetDashboard(model, function (err, data) {
        if (err) {
            logger.error('Error in getting asset detail dashboard: ' + err.message);
            next(err);
        } else if (data != null) {
            var tempData = JSON.parse(data);
            model = dashboardResModel.buildAssetDashbDetailModel(tempData);
            res.append('Content-Type', 'application/json');
            res.status(200).send(model);
        }
        res.status(400).send("Error while fetching the asset dashboard data");
    });
});

module.exports = router;
