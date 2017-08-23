'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    dashboardService = require(path.resolve('./lib/restclient/dashboard/dashboardService', '')),
    InvDetailResModel = require(path.resolve('./model/InvDetailResModel', '')),
    queryBuilder = require(path.resolve('./lib/builder/dashboardQueryBuilder', '')),
    dashboardResModel = require(path.resolve('./lib/builder/dashboardResBuilder', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils',''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/dashboards/inventory', function (req) {

    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.error(exception);
            reject(exception);
            return;
        }
        var model = queryBuilder.buildInvDashboardParams(req);
        dashboardService.getInvDashboard(model, req, function (err, data) {
            if (err) {
                logger.error('Error in inventory dashboard: ' + err.message);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
});


router.get('/dashboards/assets', function (req) {
    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.error(exception);
            reject({status:400, message: exception.message});
            return;
        }
        var model = queryBuilder.buildAssetDashboardParams(req);
        dashboardService.getAssetDashboard(model, function (err, data) {
            if (err) {
                logger.error('Error in getting asset overview dashboard' + err.message);
                reject(err);
            } else {
                var tempData = JSON.parse(data);
                model = dashboardResModel.buildAssetDashboardModel(tempData);
                resolve(model);
            }
        });
    });
});

router.get('/dashboards/inventory/breakdown', function (req) {

    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.error(exception);
            reject(exception);
            return;
        }
        var model = queryBuilder.buildInvDetailDashboardParams(req);
        dashboardService.getInvDetailDashboard(model, req, function (err, data) {
            if (err) {
                logger.error('Error in inventory detail dashboard: ' + err.message);
                reject(err);
            } else {
                resolve(dashboardResModel.transformInvDetailResponse(data, model.groupby, model.locty));
            }
        });
    });
});

router.get('/dashboards/assets/breakdown', function (req) {

    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.error(exception);
            reject(exception);
            return;
        }
        var model = queryBuilder.buildAssetDashboardParams(req);
        dashboardService.getAssetDashboard(model, function (err, data) {
            if (err) {
                logger.error('Error in getting asset detail dashboard: ' + err.message);
                reject(err);
            } else {
                model = dashboardResModel.buildAssetDashbDetailModel(data);
                resolve(model);
            }
        });
    });
});

function validateRequestParams(req) {
    if(req.baseUrl.startsWith('/dashboards/inventory')) {
        if(utils.checkNotNullEmpty(req.query.incetags) && utils.checkNotNullEmpty(req.query.exetags)) {
            utils.generateValidationError("One of include entity tags or exclude entity tags is required.");
        }
        if(req.baseUrl.endsWith('/breakdown') && utils.checkNullEmpty(req.query.groupby)) {
            utils.generateValidationError("groupby field is required");
        }
    } else {
        if (utils.checkNotNullEmpty(req.query.includeETag) && utils.checkNotNullEmpty(req.query.excludeETag)) {
            utils.generateValidationError("One of include entity tags or exclude entity tags is required.");
        }
    }
}

module.exports = router.getRouter();
