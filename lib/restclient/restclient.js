(function (restclient) {
    "use strict";
    const request = require('request');
    var logger = require('../../lib/utils/log');

    restclient.callApi = function (options, callback) {
        //rest api call status holder
        var status;
        request(options, function (err, response, body) {
            if (err) {
                logger.error("Server error for resource: "+ options.url);
                callback(new Error("Internal Server Error:"+ err.message,500), null);
            } else {
                status = response.statusCode;
                if (status != null && status == 200 || status == 201 || status == 202 && body != null) {
                    callback(null, body);
                }
                else {
                    logger.error("Business error for resource: "+ options.url);
                    callback(new Error("Internal Server Error", status), null);
                }
            }
        });
    }
})(module.exports);

