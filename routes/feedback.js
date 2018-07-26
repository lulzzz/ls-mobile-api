'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    decoder = require(path.resolve('./lib/utils/urldecoder', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
    feedbackService = require(path.resolve('./lib/restclient/collaboration/feedbackService'));

router.use(function (req, res, next) {
    req.url = decoder.decodeurl(req);
    return next();
});

router.post('/feedback', function (req) {

    return new Promise(function (resolve, reject) {
        try{
            validatePayload(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
        }
        req.body.userId = req.body.user_id;
        feedbackService.submitFeedback(req, function (err,data) {
            if (err) {
                logger.error('Error in submitting feedback '+ err);
                reject(err);
            } else {
                resolve({"message":data});
            }
        });
    });
});

function validatePayload(req) {
    if(utils.checkNullEmpty(req.headers['x-app-name'])
        || utils.checkNullEmpty(req.headers['x-app-ver'])
        || utils.checkNullEmpty(req.body.user_id)
        || utils.checkNullEmpty(req.body.text)) {
        utils.generateValidationError("Mandatory request headers are missing.");
    }
}

module.exports = router.getRouter();
