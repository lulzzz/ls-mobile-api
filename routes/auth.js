'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log','')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    utils = require(path.resolve('./lib/utils/common/common-utils','')),
    authService = require(path.resolve('./lib/restclient/auth/authService',''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/auth/login', function (req, res, next) {

    const cred = req.headers['authorization'];
    const xforward = req.headers['x-real-ip'];
    var tmp = cred.split(' '),   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        buf = new Buffer(tmp[1], 'base64'), // create a buffer and tell it the data coming in is base64
        plain_auth = buf.toString();        // read it back out as a string

    var creds = plain_auth.split(':'),      // split on a ':'
        username = creds[0],
        password = creds[1];

    //validating input paras
    if (utils.checkNotNullEmpty(username) && utils.checkNotNullEmpty(password)) {
        authService.login(username, password,xforward, res, function (err, body) {
            if (err) {
                logger.error("Error in login for user ", username);
                next(err);
            } else if (body) {
                res.append('Content-Type', 'application/json');
                res.send(body);
            }
        });
    } else {
        res.status(400).send("Bad request");
    }
});

router.post('/auth/generate-otp', function (req, res, next) {

    if (typeof !(req.body == 'undefined') && typeof !(req.body.user == 'undefined')) {
        var unm = req.body.user;
        const xforward = req.headers['x-real-ip'];
        authService.generateOtp(unm, xforward, function (err, data) {
            if (err) {
                logger.error("Error in otp generation for user ", unm);
                next(err);
            } else if (data !=null) {
                res.append('Content-Type', 'application/json');
                res.status(201).send("OTP generated successfully");
            }
        });
    } else {
        res.status(400).send("Bad Request");
    }
});

router.post('/auth/reset-password', function (req, res, next) {

    if ((typeof !(req.body == 'undefined'))
        && (utils.checkNotNullEmpty(req.body.uid)
        && utils.checkNotNullEmpty(req.body.npd)
        && utils.checkNotNullEmpty(req.body.otp))) {

        var unm = req.body.uid,
            pwd = req.body.npd,
            token = req.body.otp;
        const xforward = req.headers['x-real-ip'];

        authService.resetPassword(unm, pwd, token, xforward, function (err, data) {
            if (err) {
                logger.error("Error in reset password for user ", unm);
                next(err);
            } else if (data != null) {
                res.append('Content-Type', 'application/json');
                res.status(201).send("Passowrd reset successfully");
            }
        });
    } else {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;
