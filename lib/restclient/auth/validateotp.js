//function to validate otp
(function (validateotp) {
    "use strict";

    const request = require('request');
    validateotp.validateOtp = function(userid, otp, callback) {
        var options = {
            url: 'http://localhost:8080/s2/api/m/auth/validateotp',
            method: 'POST',
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            body: {'uid':userid,'otp':otp},
            json:true,
            timedOut: 1000
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
