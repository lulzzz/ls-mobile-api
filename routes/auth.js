'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    authService = require(path.resolve('./lib/restclient/auth/authService', ''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/auth/login', function (req, res, next) {

    logger.info("inside login method with headers" + JSON.stringify(req.headers));
    const cred = req.headers['authorization'];
    var tmp = cred.split(' '),   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        buf = new Buffer(tmp[1], 'base64'), // create a buffer and tell it the data coming in is base64
        plain_auth = buf.toString();        // read it back out as a string
    logger.info("Decoded Authorization ", plain_auth);
    // At this point plain_auth = "username:password"
    var creds = plain_auth.split(':'),      // split on a ':'
        username = creds[0],
        password = creds[1];

    authService.login(username, password, res, function (err, body) {
        if (err) {
            logger.error("Error in login for user ", username);
            next(err);
        } else if (body) {
            res.append('Content-Type', 'application/json');
            res.send(body);
        } else {
            res.status(500).send("Error while logging in for user " + username);
        }
    });
});

router.post('/auth/generateotp', function (req, res, next) {

    if (typeof !(req.body == 'undefined') && typeof !(req.body.user == 'undefined')) {
        var unm = req.body.user;

        authService.generateOtp(unm, function (err, data) {
            if (err) {
                logger.error("Error in otp generation for user ", unm);
                next(err);
            } else if (data) {
                res.append('Content-Type', 'application/json');
                res.status(201).send(data);
            }
            else {
                res.status(500).send("Error while generating the otp");
            }
        });
    } else {
        res.status(400).send("Bad Request");
    }
});

/*router.post('/auth/validateotp', function (req, res, next) {

 authService.validateOtp('kumarg', '880959', function (err, data) {
 if (err) {
 next(err);
 } else if (data) {
 res.append('Content-Type', 'application/json');
 res.status(202).send(data);
 }
 res.status(500).send("Error in validating otp");
 });
 });*/

router.post('/auth/resetpassword', function (req, res, next) {

    if (typeof !(req.body == 'undefined')) {
        var unm = req.body.uid,
            pwd = req.body.npd,
            token = req.body.otp;

        authService.resetPassword(unm, pwd, token, function (err, data) {
            if (err) {
                logger.error("Error in reset password for user ", unm);
                next(err);
            } else if (data) {
                res.append('Content-Type', 'application/json');
                res.status(201).send(data);
            }
            else {
                res.status(500).send("Error while resetting the password");
            }
        });
    } else {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;
