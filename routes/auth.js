'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    request = require('request'),
    config = require("../conf/index"),
    uuid = require('uuid'),
    config = require('../conf'),
    urlDecoder = require('../lib/utils/urldecoder'),
    login = require('../lib/restclient/auth/login'),
    generateotp = require('../lib/restclient/auth/generateotp'),
    validateotp = require('../lib/restclient/auth/validateotp'),
    resetpassword = require('../lib/restclient/auth/resetpassword');


router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/auth/login', function (req, res, next) {
    logger.info("inside login method with headers" + JSON.stringify(req.headers));
    const cred = req.headers['authorization'];
    var tmp = cred.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
    var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString();        // read it back out as a string
    logger.info("Decoded Authorization ", plain_auth);
    // At this point plain_auth = "username:password"
    var creds = plain_auth.split(':');      // split on a ':'
    var username = creds[0];
    var password = creds[1];
    login.login(username, password, res, function (err, body) {
        if (err) {
            logger.error("Error in login for user ", username);
            next(err);
        }
        if (body) {
            res.append('Content-Type', 'application/json');
            res.send(body);
        }
    });
});

router.post('/auth/generateotp', function (req, res, next) {
    if (typeof !(req.body == 'undefined') && typeof !(req.body.user == 'undefined')) {
        var unm = req.body.user;
        generateotp.generateOtp(unm, function (err, data) {
            if (err) {
                logger.error("Error in otp generation for user ", unm);
                next(err);
            }
            if (data) {
                res.append('Content-Type', 'application/json');
                res.status(201).send(data);
            }
        });
    } else {
        res.status(400).send("Bad Request");
    }
});

// router.post('/auth/validateotp', function(req,res,next) {
//
//     validateotp.validateOtp('kumarg','880959',function (err,data) {
//         //follow this standard for proper error handling and response creation
//
//         if (err) {
//             next(err);
//         }
//         if (data) {
//             res.append('Content-Type', 'application/json');
//             res.status(202).send(data);
//         }
//
//     });
// });

router.post('/auth/resetpassword', function (req, res, next) {
    //get the req body
    if (typeof !(req.body == 'undefined')) {
        //body parsing
        var unm = req.body.uid;
        var pwd = req.body.npd;
        var token = req.body.otp;
        //reset password
        resetpassword.resetPassword(unm, pwd, token, function (err, data) {
            if (err) {
                logger.error("Error in reset password for user ", unm);
                next(err);
            }
            if (data) {
                res.append('Content-Type', 'application/json');
                res.status(201).send(data);
            }
        });

    } else {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;
