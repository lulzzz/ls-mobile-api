//function to get dashboard inventory
(function (dashboardService) {

    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    dashboardService.getInvDashboard = function (q, req, callback) {
        var options = {
            url: config.baseurl + config.dashconfig.dash_inv.url,
            method: config.dashconfig.dash_inv.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            qs: {
                incetags: q.incetags,
                exetags: q.exetags,
                mtags: q.mtags,
                mnm: q.mnm,
                loc: q.loc,
                locty: q.locty,
                p: q.p,
                date: q.date,
                refresh: q.refresh
            },
            timedOut: config.dashconfig.dash_inv.timeout,
            time: true
        };
        //here call to logistimo api for dashboard inv api
        restClient.callApi(options, callback);
    };
    dashboardService.getAssetDashboard = function (queryModel, callback) {
        var options = {
            url: config.baseurl + config.dashconfig.dash_ast.url,
            method: config.dashconfig.dash_ast.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': queryModel.user,
                'x-request-id': queryModel.reqId
            },
            qs: {
                filter: queryModel.filter,
                level: queryModel.level,
                aType: queryModel.aType,
                size: queryModel.size,
                offset: queryModel.offset,
                excludeETag: queryModel.excludeETag,
                refresh: queryModel.refresh,
                onlyTempData: queryModel.onlyTempData,
                tPeriod: queryModel.tPeriod,
                includeETag: queryModel.includeETag

            },
            timedOut: config.dashconfig.dash_ast.timeout,
            time: true
        };
        //here call to logistimo api for asset dashboard
        restClient.callApi(options, callback);
    };
    dashboardService.getInvDetailDashboard = function (q, req, callback) {
        var options = {
            url: config.baseurl + config.dashconfig.dash_invdetail.url,
            method: config.dashconfig.dash_invdetail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            qs: {
                incetags: q.incetags,
                exetags: q.exetags,
                mtags: q.mtags,
                mnm: q.mnm,
                loc: q.loc,
                locty: q.locty,
                p: q.p,
                date: q.date,
                groupby: q.groupby,
                refresh: q.refresh
            },
            timedOut: config.dashconfig.dash_invdetail.timeout,
            time: true
        };
        //here call to logistimo api for dashboard inv detail api
        restClient.callApi(options, callback);
    }

})(module.exports);
