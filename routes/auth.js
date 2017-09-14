'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    utils = require(path.resolve('./lib/utils/common/common-utils','')),
    authService = require(path.resolve('./lib/restclient/auth/authService',''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/auth/login', function (req, res) {

    return new Promise(function(resolve, reject) {
        const cred = req.headers['authorization'];
        const xforward = req.headers['x-real-ip'];
        const appname = req.headers['x-app-name'];
        const appver = req.headers['x-app-ver'];
        var tmp = cred.split(' '),   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
            buf = new Buffer(tmp[1], 'base64'), // create a buffer and tell it the data coming in is base64
            plain_auth = buf.toString();        // read it back out as a string

        var creds = plain_auth.split(':'),      // split on a ':'
            username = creds[0],
            password = creds[1];

        //validating input paras
        if (utils.checkNotNullEmpty(username) && utils.checkNotNullEmpty(password)) {
            authService.login(username, password, appname, appver, xforward, res, function (err, body) {
                if (err) {
                    logger.error("Error in login for user ", username);
                    console.log(err.message);
                    reject({status: 401, message: err.message});
                } else {
                    resolve(body);
                }
            });
        } else {
            reject({status: 400, message: "Bad request"});
        }
    });

});

router.post('/auth/generate-otp', function (req) {

    return new Promise(function(resolve, reject) {
        if (typeof !(req.body == 'undefined') && typeof !(req.body.user == 'undefined')) {
            var unm = req.body.user;
            const xforward = req.headers['x-real-ip'];
            authService.generateOtp(unm, xforward, function (err, body) {
                if (err) {
                    logger.error("Error in otp generation for user ", unm);
                    reject(err);
                } else {
                    if(body.isError) {
                        reject({status: 404, message: body.errorMsg});
                    } else {
                        resolve({message: "OTP generated successfully"});
                    }
                }
            });
        } else {
            reject({status: 400, message: "Bad request"});
        }
    });
});

router.post('/auth/reset-password', function (req) {

    return new Promise(function(resolve, reject) {
        if ((typeof !(req.body == 'undefined'))
            && (utils.checkNotNullEmpty(req.body.uid)
            && utils.checkNotNullEmpty(req.body.npd)
            && utils.checkNotNullEmpty(req.body.otp))) {

            var unm = req.body.uid,
                pwd = req.body.npd,
                token = req.body.otp;
            const xforward = req.headers['x-real-ip'];

            authService.resetPassword(unm, pwd, token, xforward, function (err) {
                if (err) {
                    logger.error("Error in reset password for user ", unm);
                    reject(err);
                } else {
                    resolve({message: "Password reset successfully"});
                }
            });
        } else {
            reject({status: 400, message: "Bad request"});
        }
    });
});

module.exports = router.getRouter();
