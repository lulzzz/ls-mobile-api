//function to get dashboard inventory
(function (assetDashboard) {

    "use strict";

    const config = require('../../../conf');
    const restClient = require('../restclient');


    assetDashboard.getAssetDashboard = function(callback) {
        var options = {
            url: config.baseurl+config.dashconfig.dash_ast.url,
            method: config.dashconfig.dash_ast.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-token': queryModel.token
            },
            qs: {
                excludeETag: queryModel.excludeETag,
                skipCache: queryModel.skipCache,
                onlyTempData: queryModel.onlyTempData,
                tPeriod: queryModel.tPeriod
            },
            timedOut: config.dashconfig.dash_ast.timeout
        };
        //here call to logistimo api for asset dashboard
        restClient.callApi(options,callback);
    }

})(module.exports);
