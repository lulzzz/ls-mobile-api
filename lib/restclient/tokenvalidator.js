//function to validate token
(function (validator) {
    "use strict";

    var path = require('path');
    const request = require('request'),
        config = require(path.resolve('./conf', ''));
    validator.validateToken = function (ptoken, pinitiator, callback) {
        var options = {
            url: config.baseurl + config.sectokenconfig.url,
            method: config.sectokenconfig.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'x-access-initiator':pinitiator
            },
            body: ptoken,
            json: true,
            timedOut: config.sectokenconfig.timeout,
            time:true
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                status = response.statusCode;
            }
            if (status != null && status == 200 || status == 201 && body) {
                callback(null, body);
            }
            else {
                callback(new Error("Unauthorised user"), null);
            }
        });
    }

})(module.exports);
