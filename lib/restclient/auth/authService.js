//function to login
(function (authService) {

    "use strict";

    var request = require('request'),
        path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    authService.login = function (username, password, ip, res, callback) {
        var options = {
            url: config.baseurl + config.loginconfig.login.url,
            method: config.loginconfig.login.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': ip
            },
            body: {'userId': username, 'password': password, 'language': 'en'},
            json: true,
            timedOut: config.loginconfig.login.timeout
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {
            if (err) {
                callback(new Error("Internal Server Error:" + err.message, 500), null);
            } else {
                status = response.statusCode;
                if (status != null && status == 200 || status == 201 || status == 202 && body != null) {
                    var token = response.headers["x-access-token"];
                    var expiry = response.headers["expires"];
                    res.status(status);
                    res.append('X-access-token', token);
                    res.append('expires_in', expiry);
                    callback(null, body);
                }
                else {
                    callback(new Error("Unauthorised user", status), null);
                }
            }
        });
    };

    authService.generateOtp = function (userId, ip, callback) {
        var options = {
            url: config.baseurl + config.loginconfig.generateotp.url,
            method: config.loginconfig.generateotp.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': ip
            },
            body: userId,
            timedOut: config.loginconfig.generateotp.timeout
        };
        restClient.callApi(options, callback);
    };

    authService.resetPassword = function (userid, newpwd, otp, ip, callback) {
        var options = {
            url: config.baseurl + config.loginconfig.resetpassword.url,
            method: config.loginconfig.resetpassword.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': ip
            },
            body: {'uid': userid, 'npd': newpwd, 'otp': otp},
            json: true,
            timedOut: config.loginconfig.resetpassword.timeout
        };
        restClient.callApi(options, callback);
    };

    authService.validateOtp = function (userid, otp, ip, callback) {
        var options = {
            url: config.baseurl + config.loginconfig.validateotp.url,
            method: config.loginconfig.validateotp.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': ip
            },
            body: {'uid': userid, 'otp': otp},
            json: true,
            timedOut: config.loginconfig.validateotp.timeout
        };
        var status;
        request(options, function (err, response, body) {
            if (err) {
                callback(new Error("Internal Server Error:" + err.message, 500), null);
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
    };

})(module.exports);
