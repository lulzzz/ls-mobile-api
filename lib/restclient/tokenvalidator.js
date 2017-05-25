//function to validate token
(function (validator) {
    "use strict";

    const request = require('request');
    const config = require('../../conf');
    validator.validatetoken = function(ptoken, callback) {
        var options = {
            url: config.baseurl+config.sectokenconfig.url,
            method: config.sectokenconfig.method,
            headers: {
                'Accept-Charset': 'utf-8'
            },
            body: ptoken,
            json:true,
            timedOut: config.sectokenconfig.timeout
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {
            status = response.statusCode;
            if (err) {
                console.log(err);
            }
            //console.log("res headers: " + response.headers + "\n"+"res cookies: " + response.cookies + "\n");
            if (status != null && status == 200 || status == 201 && body) {
                callback(null,body);
            }
            else {
                callback(new Error("Unauthorised user"),null);
            }
        });
    }

})(module.exports);