/**
 * Created by smriti on 5/2/17.
 */
(function(assetService) {
    "use strict";
    const config = require('../../../conf');
    const restClient = require('../restclient');
    assetService.getRecentAlerts = function(q, req, res, callback) {
        var options = {
            url: config.tempurl + config.asset_alerts.url + q.vId + '/' + q.dId,
            method: config.asset_alerts.method,
            headers: {
                'Accept-Charset' : 'utf-8',
                'Content-Type' : 'application/json',
                'x-access-token': q.token
            },
            qs: {
                page: q.page,
                size: q.size
            },
            timedOut: config.asset_alerts.timeout
        };
        restClient.callApi(options,callback);
    };
    assetService.getAssetsForDomain = function (queryModel,url, callback) {
        var options = {
            url: config.tempurl + config.dashconfig.asset_detail.url + url,
            method: config.dashconfig.asset_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'Authorization': queryModel.auth,
                'x-request-id': queryModel.reqId
            },
            qs: {
                page: queryModel.page,
                size: queryModel.size,
                eid: queryModel.eid,
                tag: queryModel.dId,
                ws: queryModel.ws,
                awr: queryModel.awr,
                dur: queryModel.dur,
                ty: queryModel.ty
            },
            timedOut: config.dashconfig.asset_detail.timeout
        };
        restClient.callApi(options, callback);
    };
})
(module.exports);