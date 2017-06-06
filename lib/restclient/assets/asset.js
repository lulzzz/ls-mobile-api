/**
 * Created by smriti on 5/2/17.
 */
(function (assetService) {
    "use strict";

    var path = require("path"),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    assetService.getRecentAlerts = function (queryModel, callback) {
        var options = {
            url: config.tempurl + config.assetConfig.asset_alerts.url + queryModel.vid + '/' + queryModel.did,
            method: config.assetConfig.asset_alerts.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-request-id': queryModel.reqId,
                'Authorization': queryModel.auth
            },
            qs: {
                page: queryModel.page,
                size: queryModel.size
            },
            timedOut: config.assetConfig.asset_alerts.timeout
        };
        restClient.callApi(options, callback);
    };

    assetService.getAssetsForDomain = function (queryModel, callback) {
        var options = {
            url: config.tempurl + config.assetConfig.asset_detail.url + queryModel.url,
            method: config.assetConfig.asset_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'Authorization': queryModel.auth,
                'x-request-id': queryModel.reqId
            },
           /* qs: {
                page: queryModel.page,
                size: queryModel.size,
                eid: queryModel.eid,
                tag: queryModel.dId,
                ws: queryModel.ws,
                awr: queryModel.awr,
                dur: queryModel.dur,
                ty: queryModel.ty
            },*/
            timedOut: config.assetConfig.asset_detail.timeout
        };
        restClient.callApi(options, callback);
    };

    assetService.getAssetsListingsData = function (queryModel, callback) {
        var options = {
            url: config.baseurl + config.assetConfig.assets.url,
            method: config.assetConfig.assets.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': queryModel.user,
                'x-request-id': queryModel.reqId
            },
            qs: {
                size: queryModel.size,
                offset: queryModel.offset
            },
            body: queryModel.data,
            timeout: config.assetConfig.assets.timeout
        };
        restClient.callApi(options, callback);
    };

    assetService.getTemperatureData = function (queryModel, callback) {
        var monitoringAssetConfig = config.assetConfig.monitoring_asset_temp,
            monitoredAssetConfig = config.assetConfig.monitored_asset_temp,
            isMonitoringAsset = queryModel.ty == 1,
            tempUrl = isMonitoringAsset ? monitoringAssetConfig.url : monitoredAssetConfig.url,
            options = {
                url: config.tempurl + tempUrl + queryModel.url,
                method: isMonitoringAsset ? monitoringAssetConfig.method : monitoredAssetConfig.method,
                headers: {
                    'Accept-Charset': 'utf-8',
                    'Content-Type': 'application/json',
                    'Authorization': queryModel.auth,
                    'x-request-id': queryModel.reqId
                },
                timeout: isMonitoringAsset ? monitoringAssetConfig.timeout : monitoredAssetConfig.timeout
            };
        restClient.callApi(options, callback);
    };
})
(module.exports);