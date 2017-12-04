'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    decoder = require(path.resolve('./lib/utils/urldecoder', '')),
    service = require(path.resolve('./lib/restclient/events/eventService', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
    domainCfgService = require(path.resolve('./lib/restclient/domain/domainCfgService', '')),
    eventResBuilder = require(path.resolve('./lib/builder/eventResBuilder', '')),
    redisService = require(path.resolve('./lib/redis/redisService', '')),
    date = parseInt((new Date().setHours(23, 59, 59, 999) - new Date()) / 1000),
    constant = require(path.resolve('./lib/constants/constants',''));

router.use(function (req, res, next) {
    req.url = decoder.decodeurl(req);
    return next();
});

router.get('/event-summaries', function (req) {
    try {
        validateRequestParams(req);
    } catch (exception) {
        logger.warn(exception);
        reject(exception);
        return;
    }
    return new Promise(function (resolve, reject) {
        var key = "event" + "_" + req.query.cn_domain_id;
        if (utils.checkNotNullEmpty(req.query.event_id)) {
            key = key + "_" + req.query.event_id;
        }
        redisService.getData(key, function (err, cacheData) {
            if (err) {
                // do nothing
            } else {
                if (utils.checkNotNullEmpty(cacheData)) {
                    resolve(JSON.parse(cacheData));
                } else {
                    service.getEventSummaries(req, function (err, data) {
                        if (err) {
                            logger.error("Error while fetching event summaries for domain: " + req.query.cn_domain_id);
                            reject(err);
                        } else {
                            if (req.query.include_distribution) {
                                var eventData = JSON.parse(data);
                                if (utils.checkNotNullEmptyArray(eventData.summaries)) {
                                    var objectIds = eventResBuilder.getDistributionObjectIds(eventData);
                                    domainCfgService.get(req, objectIds, function (err, domainMetaData) {
                                        if (err) {
                                            logger.error("\n Error while fetching the domain general config for the object ids: \n" + exception);
                                            reject(exception);
                                        } else {
                                            resolve(eventResBuilder.buildEventSummary(JSON.parse(domainMetaData), eventData));
                                        }
                                    });
                                } else {
                                    redisService.setData(key, data, date);
                                    resolve(JSON.parse(eventData));
                                }
                            } else {
                                redisService.setData(key, data, date);
                                resolve(JSON.parse(data));
                            }
                        }
                    });

                }
            }
        });
    });
});

router.get('/event-summaries/:event_id', function (req) {
    try {
        validateRequestParams(req);
    } catch (exception) {
        logger.warn(exception);
        reject(exception);
        return;
    }
    return new Promise(function (resolve, reject) {
        var key = "event" + "_" + req.query.cn_domain_id + "_" + req.params.event_id;
        if(utils.checkNotNullEmpty(req.query.domain_id)) {
            key = "_" + req.query.domain_id;
        }
        key += "_" + (req.query.offset || constant.const.OFFSET);
        redisService.getData(key, function (err, cacheData) {
            if (err) {
                // do nothing
            } else {
                if (utils.checkNotNullEmpty(cacheData)) {
                    resolve(JSON.parse(cacheData));
                } else {
                    service.getEventsByType(req, function (err, data) {
                        if (err) {
                            logger.error("Error while fetching event summaries for domain " + req.query.cn_domain_id + " and event" + req.params.event_id);
                            reject(err);
                        } else {
                            redisService.setData(key, data, date);
                            resolve(JSON.parse(data));
                        }
                    });
                }
            }
        });
    });
});

function validateRequestParams(req) {
    if (req.baseUrl.endsWith('event-summaries')) {
        if (utils.checkNullEmpty(req.query.cn_domain_id)) {
            utils.generateValidationError("Current domain id is required.");
        }
        if (utils.checkNullEmpty(req.query.user_id)) {
            utils.generateValidationError("user id is required.");
        }
    } else {
        if (utils.checkNullEmpty(req.query.cn_domain_id)) {
            utils.generateValidationError("Current domain id is required.");
        }
        if (utils.checkNullEmpty(req.query.user_id)) {
            utils.generateValidationError("user id is required.");
        }
        if (utils.checkNullEmpty(req.params.event_id)) {
            utils.generateValidationError("Event id is required.");
        }
    }
}

module.exports = router.getRouter();
