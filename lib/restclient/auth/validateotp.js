//function to validate otp
(function (validateotp) {
    "use strict";

    const request = require('request');
    const config = require('../../../conf');

    validateotp.validateOtp = function(userid, otp, callback) {
        var options = {
            url: config.baseurl+config.loginconfig.validateotp.url,
            method: config.loginconfig.validateotp.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            body: {'uid':userid,'otp':otp},
            json:true,
            timedOut: config.loginconfig.validateotp.timeout
        };
        var status;
        request(options, function (err, response, body) {
            if (err) {
                callback(new Error("Internal Server Error:"+err.message,500), null);
            } else {
                status = response.statusCode;
                if (status != null && status == 200 || status == 201 || status == 202 && body != null) {
                    callback(null, body);
                }
                else {
                    callback(new Error("Unauthorised user", status), null);
                }
            }
        });
    }

})(module.exports);
