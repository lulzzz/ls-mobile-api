'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    decoder = require(path.resolve('./lib/utils/urldecoder', '')),
    service = require(path.resolve('./lib/restclient/events/eventService', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils',''));

router.use(function (req, res, next) {
    req.url = decoder.decodeurl(req);
    return next();
});

router.get('/event-summaries', function (req) {
    try {
        validateRequestParams(req);
    } catch(exception) {
        logger.error(exception);
        reject(exception);
        return;
    }
    return new Promise(function (resolve, reject) {
        service.getEventSummaries(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching event summaries for domain: " + req.query.cn_domain_id);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
});

router.get('/event-summaries/:event_id', function (req) {
    try {
        validateRequestParams(req);
    } catch(exception) {
        logger.error(exception);
        reject(exception);
        return;
    }
    return new Promise(function (resolve,reject) {
        service.getEventsByType(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching event summaries for domain " + req.query.cn_domain_id + " and event" + req.params.event_id);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
});

function validateRequestParams(req) {
    if (req.baseUrl.endsWith('event-summaries')) {
        if(utils.checkNullEmpty(req.query.cn_domain_id)){
            utils.generateValidationError("Current domain id is required.");
        }
        if(utils.checkNullEmpty(req.query.user_id)){
            utils.generateValidationError("user id is required.");
        }
    } else {
        if(utils.checkNullEmpty(req.query.cn_domain_id)){
            utils.generateValidationError("Current domain id is required.");
        }
        if(utils.checkNullEmpty(req.query.user_id)){
            utils.generateValidationError("user id is required.");
        }
        if (utils.checkNullEmpty(req.params.event_id)) {
            utils.generateValidationError("Event id is required.");
        }
    }
}

module.exports = router.getRouter();
