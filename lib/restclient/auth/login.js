//function to login
(function (login) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');

    login.login = function(username, password, res, callback) {
        var options = {
            url: config.baseurl+config.loginconfig.login.url,
            method: config.loginconfig.login.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            body: {'userId':username,'password':password,'language':'en'},
            json:true,
            timedOut: config.loginconfig.login.timeout
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {
            if (err) {
                callback(new Error("Internal Server Error:"+ err.message,500), null);
            } else {
                status = response.statusCode;
                if (status != null && status == 200 || status == 201 || status == 202 && body != null) {
                    var token = response.headers["x-access-token"];
                    var expiry = response.headers["expires"];
                    res.status(status);
                    res.append('X-access-token',token);
                    res.append('expires_in',expiry);
                    callback(null, body);
                }
                else {
                    callback(new Error("Unauthorised user", status), null);
                }
            }
        });
    }

})(module.exports);
