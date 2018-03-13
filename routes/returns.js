/**
 * Created by yuvaraj on 12/03/18.
 */

'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    returnService = require(path.resolve('./lib/restclient/returns/returnService', '')),
    commonUtils = require(path.resolve('./lib/utils/common/common-utils', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/returns', function (req, res) {
    return new Promise(function (resolve, reject) {
        try {
            validate(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        returnService.createReturns(req, function (err, data) {
            if (err) {
                logger.error('Error in creating a return: ' + err.message);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
});

router.post('/returns/:return_id/:status', function (req, res) {
    return new Promise(function (resolve, reject) {
        try {
            validate(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        returnService.updateReturn(req, function (err, data) {
            if (err) {
                logger.error('Error in updating a return: ' + err.message);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
});

router.get('/returns/:return_id', function (req, res) {
    return new Promise(function (resolve, reject) {
        try {
            validate(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        returnService.getReturn(req, function (err, data) {
            if (err) {
                logger.error('Error in updating a return: ' + err.message);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
});



function validate(req) {
    
}

module.exports = router.getRouter();
