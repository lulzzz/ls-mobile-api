//function to login
(function (authService) {

    "use strict";

    var request = require('request'),
        path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', '')),
        GatewayError = require(path.resolve('./lib/error/gatewayerror', '')),
        constants = require(path.resolve('./lib/constants/constants','')).const,
        md5 = require('md5'),
        utils = require(path.resolve('./lib/utils/common/common-utils'));

    authService.login = function (model, res, callback) {
        var url;
        if (model.skipTwoFactorAuthentication) {
            url = config.baseurl + config.loginconfig.login.url;
        } else {
            url = config.baseurl + config.loginconfig.loginV1.url;
        }
        processLoginRequest(url, model, res, callback);
    };

    authService.generateOtp = function (userId, xforward, isTwoFactorAuthenticationOTP, callback) {
        var otpType;
        if(isTwoFactorAuthenticationOTP) {
            otpType = "twoFA_otp";
        }
        var options = {
            url: config.baseurl + config.loginconfig.generateotp.url,
            method: config.loginconfig.generateotp.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': xforward
            },
            body: {'uid': userId, 'mode': 0, 'udty': 'm', otpType: otpType},
            json :true,
            timedOut: config.loginconfig.generateotp.timeout,
            time: true
        };
        restClient.callApi(options, callback);
    };

    authService.resetPassword = function (userid, newpwd, otp, xforward, callback) {
        var options = {
            url: config.baseurl + config.loginconfig.resetpassword.url,
            method: config.loginconfig.resetpassword.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': xforward
            },
            body: {'uid': userid, 'npd': newpwd, 'otp': otp},
            json: true,
            timedOut: config.loginconfig.resetpassword.timeout,
            time: true
        };
        restClient.callApi(options, callback);
    };

    authService.validateOtp = function (userid, otp, callback) {
        var options = {
            url: config.baseurl + config.loginconfig.validateotp.url,
            method: config.loginconfig.validateotp.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json'
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

    authService.process2FAOTPGenerationRequest = function (request, callback) {
        var options = {
            url: config.baseurl + config.loginconfig.generate2FAOTP.url,
            method: config.loginconfig.generate2FAOTP.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': request.headers['x-real-ip'],
                'x-app-name': request.headers['x-app-name']
            },
            body: {'uid': request.body.user_id, 'mode': constants.SMS, 'udty': 'm'},
            json: true,
            timedOut: config.loginconfig.generate2FAOTP.timeout
        };
        restClient.callApi(options, callback);
    };

    function processLoginRequest(url, model, res, callback) {
        var options = {
            url: url,
            method: config.loginconfig.login.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': model.realIP,
                'x-app-name': model.appName,
                'x-app-ver': model.appVersion,
                'Cookie': model.cookie
            },
            body: {'userId': model.username, 'password': model.password, 'language': model.language, otp: model.otp},
            json: true,
            timedOut: config.loginconfig.login.timeout,
            time: true
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {

            if (err) {
                callback(new Error("Internal Server Error:" + err.message, 500), null);
            } else {
                status = response.statusCode;
                if (status != null && (status == 200 || status == 201 || status == 202) && body != null) {
                    var token = response.headers["x-access-token"];
                    var expiry = response.headers["expires"];
                    res.status(status);
                    res.append('X-access-token', token);
                    var authKey = "_di" + md5(model.username);
                    var authValue = response.headers[authKey];
                    if(utils.checkNotNullEmpty(authValue)) {
                        res.append('expires_in', expiry);
                        res.append(authKey, authValue);
                    }

                    callback(null, body);
                }
                else {
                    callback(new GatewayError(body, status), null);
                }
            }
        });
    }

})(module.exports);
