(function (restclient) {
    "use strict";
    const request = require('request');
    var path = require('path'),
        logger = require(path.resolve('./lib/utils/log', '')),
        GatewayError = require(path.resolve('./lib/error/gatewayerror',''));

    restclient.callApi = function (options, callback) {
        //rest api call status holder
        var status;
        var msg;
        request(options, function (err, response, body) {
            if (err) {
                logger.error("Server error for resource: " + options.url);
                callback(new Error("Internal Server Error:" + err.message, 500), null);
            } else {
                status = response.statusCode;
                msg = response.statusMessage;
                if (status != null && status == 200 || status == 201 || status == 202 || status == 204 && body != null) {
                    callback(null, body);
                }
                else {
                    logger.error("Business error for resource: " + options.url);
                    callback(new GatewayError(msg, status), null);
                }
            }
        });
    }
})(module.exports);

