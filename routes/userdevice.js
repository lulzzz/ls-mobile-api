/**
 * Created by yuvaraj on 24/05/17.
 */
'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log','')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    queryBuilder = require(path.resolve('./lib/builder/userDeviceQueryBuilder','')),
    userdeviceConfig = require(path.resolve('./lib/restclient/userdevice/userdevice',''));

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/userdevice', function (req, res, next) {
    var model = queryBuilder.buildAddEditParams(req);
    userdeviceConfig.addEditUserDevice(model, req, function (err,data) {
        if (err) {
            logger.error('Error in storing user device '+err.message);
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
        res.status(500).send("Error in storing user device");
    });
});

router.get('/userdevice/gettoken', function (req, res, next) {
    var model = queryBuilder.buildGetTokenParams(req);
    userdeviceConfig.getUDToken(model, function (err,data) {
        if (err) {
            logger.error('Error in getting user device token '+err.message);
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
        res.status(500).send("Error in fetching user device token");
    });
});
module.exports = router;