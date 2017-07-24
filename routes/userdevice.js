/**
 * Created by yuvaraj on 24/05/17.
 */
'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/log','')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    userDeviceQueryBuilder = require(path.resolve('./lib/builder/userDeviceQueryBuilder','')),
    userDeviceService = require(path.resolve('./lib/restclient/userdevice/userdevice',''));

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/user-device', function (req, res) {
    return new Promise(function (resolve, reject) {
        var model = userDeviceQueryBuilder.buildAddEditParams(req);
        userDeviceService.addEditUserDevice(model,req,res,function (err) {
            if (err) {
                logger.error('Error in storing user device '+err.message);
                reject(err);
            } else {
                resolve({message: "User device stored successfully"});
            }
        });
    });
});

module.exports = router.getRouter();