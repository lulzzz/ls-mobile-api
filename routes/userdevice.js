/**
 * Created by yuvaraj on 24/05/17.
 */
'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log','')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    userDeviceQueryBuilder = require(path.resolve('./lib/builder/userDeviceQueryBuilder','')),
    userdeviceService = require(path.resolve('./lib/restclient/userdevice/userdevice',''));

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/user-device', function (req, res, next) {
    var model = userDeviceQueryBuilder.buildAddEditParams(req);
    userdeviceService.addEditUserDevice(model,req,res,function (err,data) {
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

module.exports = router;