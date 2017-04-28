//function to validate otp
(function (resetpwd) {
    "use strict";

    const request = require('request');
    resetpwd.resetPassword = function(userid, newpwd, callback) {
        var options = {
            url: 'http://localhost:8080/s2/api/m/auth/resetpassword',
            method: 'POST',
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            body: {'uid':userid,'npd':newpwd},
            json:true,
            timedOut: 1000
        };
        var status;
        request(options, function (err, response, body) {
            //this may be some unexpected error like client payload error
            if (err) {
                callback(new Error("Internal Server Error:"+ err.message,500), null);
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
