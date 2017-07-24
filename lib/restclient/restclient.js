(function (restclient) {
    "use strict";
    const request = require('request');
    var path = require('path'),
        logger = require(path.resolve('./lib/utils/log', '')),
        GatewayError = require(path.resolve('./lib/error/gatewayerror', '')),
        config = require(path.resolve('./conf', '')),
        utils = require(path.resolve('./lib/utils/common/common-utils', ''));


    restclient.callApi = function (options, callback) {
        //rest api call status holder
        var status;
        var msg;
        options.pool = {maxSockets: config.maxSockets};
        request(options, function (err, response, body) {
            if (err) {
                status = 500;
                msg = err.message;
                logger.error("Server error for resource: " + options.url);
                callback(new GatewayError(msg, status), null);
            } else {
                status = response.statusCode;
                msg = response.statusMessage;
                if (status != null &&
                    (status == 204
                    || (status == 200 || status == 201 || status == 202 && body != null))) {
                    callback(null, body || 'success');
                }
                else {
                    logger.error("Business error for resource: " + options.url);
                    if (utils.checkNotNullEmpty(response.body)) {
                        if (utils.checkIsObject(response.body)) {
                            msg = response.body || msg;
                        } else {
                            msg = JSON.parse(response.body) || msg;
                        }
                    }
                }
                callback(new GatewayError(msg, status), null);
            }
        });
    }
})(module.exports);

