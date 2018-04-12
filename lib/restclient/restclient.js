(function (restclient) {
    "use strict";
    const request = require('request');
    var path = require('path'),
        logger = require(path.resolve('./lib/utils/logger', '')),
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
                logger.error("Server error for resource: " + options.url + " detail:"+ msg);
                callback(new GatewayError(msg, status), null);
            } else {
                status = response.statusCode;
                msg = response.statusMessage;
                if (status != null &&
                    (status == 204
                    || (status == 200 || status == 201 || status == 202 && body != null))) {
                    callback(null, body);
                }
                else {
                    logger.error("Business error for resource: " + options.url + " detail:"+ msg);
                    msg = constructMessage(response.body,msg);
                    callback(new GatewayError(msg, status), null);
                }
            }
        });
    };

    function constructMessage(body,msg) {
        if (utils.checkNotNullEmpty(body)) {
            if (utils.checkIsObject(body)) {
                return body || msg;
            } else {
                try {
                    return JSON.parse(body) || msg;
                } catch(exception) {
                    return msg;
                }
            }
        }
        return msg;
    }
})(module.exports);

