/**
 * Created by yuvaraj on 24/05/17.
 */
'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    urlDecoder = require('../lib/utils/urldecoder'),
    UserDeviceModel = require('../model/UserDeviceModel'),
    queryBuilder = require('../lib/builder/userDeviceQueryBuilder'),
    userdeviceConfig = require('../lib/restclient/userdevice/userdevice');

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/userdevice', function (req, res, next) {
    var model = queryBuilder.buildAddEditParams(req);
    userdeviceConfig.addEditUserDevice(model,req,res,function (err,data) {
        if (err) {
            logger.error('Error in getting material list '+err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});

router.get('/userdevice/gettoken', function (req, res, next) {
    var model = queryBuilder.buildGetTokenParams(req);
    userdeviceConfig.getUDToken(model,req,res,function (err,data) {
        if (err) {
            logger.error('Error in getting material list '+err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});
module.exports = router;