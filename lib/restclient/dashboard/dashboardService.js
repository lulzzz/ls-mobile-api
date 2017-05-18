//function to get dashboard inventory
(function (dashboardService) {

    "use strict";

    const config = require('../../../conf');
    const restClient = require('../restclient');

    dashboardService.getInvDashboard = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.dash_inv.url,
            method: config.dashconfig.dash_inv.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            qs: {
                incetags:q.incetags,
                exeetags:q.exeetags,
                mtags:q.mtags,
                mnm:q.mnm,
                loc:q.loc,
                locty:q.locty,
                p:q.p,
                date:q.date,
                refresh:q.refresh
            },
            timedOut: config.dashconfig.dash_inv.timeout
        };
        //here call to logistimo api for dashboard inv api
        restClient.callApi(options,callback);
    };
    dashboardService.getAssetDashboard = function(queryModel,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.dash_ast.url,
            method: config.dashconfig.dash_ast.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
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
                skipCache: queryModel.skipCache,
                onlyTempData: queryModel.onlyTempData,
                tPeriod: queryModel.tPeriod

            },
            timedOut: config.dashconfig.dash_ast.timeout
        };
        //here call to logistimo api for asset dashboard
        restClient.callApi(options,callback);
    };
    dashboardService.getInvDetailDashboard = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.dash_invdetail.url,
            method: config.dashconfig.dash_invdetail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            qs: {
                incetags:q.incetags,
                exeetags:q.exeetags,
                mtags:q.mtags,
                mnm:q.mnm,
                loc:q.loc,
                locty:q.locty,
                p:q.p,
                date:q.date,
                groupby:q.groupby,
                refresh:q.refresh
            },
            timedOut: config.dashconfig.dash_invdetail.timeout
        };
        //here call to logistimo api for dashboard inv detail api
        restClient.callApi(options,callback);
    }

})(module.exports);
