'use strict';

var router = require('express').Router();
var logger = require('../lib/utils/log');

const request = require('request');
var config = require("../conf/index");
var uuid = require('uuid');
var login = require('../lib/restclient/auth/login');
var generateotp = require('../lib/restclient/auth/generateotp');
var validateotp = require('../lib/restclient/auth/validateotp');
var resetpassword = require('../lib/restclient/auth/resetpassword');

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    if (req.url === '/') {
        req.url = req.originalUrl;
    }
    return next();
});

router.post('/auth/login', function (req, res, next) {

    logger.info("inside login method with headers" + JSON.stringify(req.headers));
    const cred  =  req.headers['authorization'];
    var tmp = cred.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
    var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString();        // read it back out as a string
    logger.info("Decoded Authorization ", plain_auth);
    // At this point plain_auth = "username:password"
    var creds = plain_auth.split(':');      // split on a ':'
    var username = creds[0];
    var password = creds[1];
    login.login(username,password,res,function(err,body){
        if (err) {
            logger.error("Error in login for user ",username);
            next(err);
        }
        res.append('Content-Type','application/json');
        if(body) {
            res.send(body);
        }
    });
});

router.post('/auth/generateotp', function(req,res,next) {

    generateotp.generateOtp('kumarg',function (err,data) {
        if (err) {
            next(err);
        }
        res.append('Content-Type','application/json');
        res.status(201).send(data);
    });
});

router.post('/auth/validateotp', function(req,res,next) {

    validateotp.validateOtp('kumarg','880959',function (err,data) {
        //follow this standard for proper error handling and response creation

        if (err) {
            next(err);
        }
        res.append('Content-Type','application/json');
        res.status(202).send(data);
    });
});

router.post('/auth/resetpassword', function(req,res,next) {
    resetpassword.resetPassword('kumarg','123456',function (err,data) {
        if (err) {
            next(err);
        }
        res.append('Content-Type','application/json');
        res.status(201).send(data);
    });
});

module.exports = router;
