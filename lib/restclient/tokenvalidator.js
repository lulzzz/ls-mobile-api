//function to validate token
(function (validator) {
    "use strict";

    const request = require('request');
    validator.validatetoken = function(ptoken, callback) {
        var options = {
            url: 'http://localhost:8080/s2/api/m/auth/validatetoken',
            method: 'POST',
            headers: {
                'Accept-Charset': 'utf-8'
            },
            body: ptoken,
            json:true,
            timedOut: 1000
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {
            status = response.statusCode;
            if (err) {
                console.log(err);
            }
            console.log("res headers: " + response.headers + "\n");
            console.log("res cookies: " + response.cookies + "\n");
            if (status != null && status == 200 || status == 201 && body == true) {
                callback(null,{status: true});
            }
            else {
                callback(new Error("Unauthorised user"),null);;
            }
        });
    }

})(module.exports);
