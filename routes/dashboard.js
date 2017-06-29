'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    dashboardService = require(path.resolve('./lib/restclient/dashboard/dashboardService', '')),
    InvDetailResModel = require(path.resolve('./model/InvDetailResModel', '')),
    queryBuilder = require(path.resolve('./lib/builder/dashboardQueryBuilder', '')),
    dashboardResModel = require(path.resolve('./lib/builder/dashboardResBuilder', ''));


router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/dashboards/inventory', function (req, res, next) {
    var model = queryBuilder.buildInvDashboardParams(req);
    dashboardService.getInvDashboard(model, req, res, function (err, data) {
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
    });
});

router.get('/dashboards/inventory/breakdown', function (req, res, next) {
    var model = queryBuilder.buildInvDetailDashboardParams(req);
    dashboardService.getInvDetailDashboard(model, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory detail dashboard: ' + err.message)
            next(err);
        } else if (data) {
            var v = transformInvDetailResponse(data);
            res.append('Content-Type', 'application/json');
            res.status(200).send(v);
        }
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

router.get('/dashboards/assets/breakdown', function (req, res, next) {
    var model = queryBuilder.buildAssetDashboardParams(req);
    dashboardService.getAssetDashboard(model, function (err, data) {
        if (err) {
            logger.error('Error in getting asset detail dashboard: ' + err.message);
            next(err);
        } else if (data != null) {
            model = dashboardResModel.buildAssetDashbDetailModel(data);
            res.append('Content-Type', 'application/json');
            res.status(200).send(model);
        }
    });
});

module.exports = router;
