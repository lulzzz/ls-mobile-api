//function to get dashboard inventory
(function (dashast) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');


    dashast.getAssetDashboard = function(callback) {
        var options = {
            url: config.baseurl+config.dashconfig.dash_ast.url,
            method: config.dashconfig.dash_ast.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            timedOut: config.dashconfig.dash_ast.timeout
        };
        //here call to logistimo api for asset dashboard
        restclient.callApi(options,callback);
    }

})(module.exports);
