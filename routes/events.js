'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    decoder = require(path.resolve('./lib/utils/urldecoder', '')),
    service = require(path.resolve('./lib/restclient/events/eventService', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
    domainCfgService = require(path.resolve('./lib/restclient/domain/domainCfgService', '')),
    eventResBuilder = require(path.resolve('./lib/builder/eventResBuilder', '')),
    collaborationService = require(path.resolve('./lib/restclient/collaboration/collaborationService', '')),
    constants = require(path.resolve('./lib/constants/constants'));

router.use(function (req, res, next) {
    req.url = decoder.decodeurl(req);
    return next();
});

router.get('/event-summaries', function (req) {
    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        service.getEventSummaries(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching event summaries for domain: " + req.query.cn_domain_id);
                reject(err);
            } else {
                var eventData = JSON.parse(data),
                    configs = getDomainConfigs(req, eventData),
                    likesCount = getEventLikesCount(req, eventData);
                Promise.all([configs, likesCount]).then(function (results) {
                    logger.log("Received the domain configuration and like count for the event ids");
                    var eventResponse = eventResBuilder.buildEventSummary(results[0],eventData);
                    var finalEventResponse = eventResBuilder.buildLikeCountResponse(eventResponse,results[1]);
                    resolve(finalEventResponse);
                }).catch(function (exception) {
                    reject(exception);
                });
            }
        });
    });
});

function getDomainConfigs(req, eventData) {
    return new Promise(function (resolve, reject) {
        if (req.query.include_distribution) {
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
                resolve(eventData);
            }
        } else {
            resolve(eventData);
        }
    });
}

function getEventLikesCount(req, eventData) {
    return new Promise(function (resolve, reject) {
        var likeCountRequestObject = eventResBuilder.getLikesCountRequestPayload(req, eventData);
        collaborationService.getLikesCount(req, likeCountRequestObject, function (err, data) {
            if (err) {
                logger.error("\n Error while fetching the likes count for the event:" + err);
                reject(err);
            } else {
                resolve((data));
            }
        });
    });
}

router.get('/event-summaries/:event_id', function (req) {
    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch (exception) {
            logger.error(exception);
            reject(exception);
            return;
        }
        service.getEventsByType(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching event summaries for domain " + req.query.cn_domain_id + " and event" + req.params.event_id);
                reject(err);
            } else {
                var eventData = JSON.parse(data),
                    configs = getDomainConfigs(req, eventData),
                    likeCountResponse = getEventLikesCount(req, eventData);
                Promise.all([configs, likesCount]).then(function (results) {
                    logger.log("Received the domain configuration and like count for the event ids");
                    var eventResponse = eventResBuilder.buildEventSummary(results[0],eventData);
                    var finalEventResponse = eventResBuilder.buildLikeCountResponse(eventResponse,results[1]);
                    resolve(finalEventResponse);
                }).catch(function (exception) {
                    reject(exception);
                });
            }
        });
    });
});

router.post('/event-summaries/:event_id/like', function (req) {
    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        req.body.user = req.headers['x-access-user'];
        req.body.contextId = req.params.event_id;
        collaborationService.postLike(req, function (err, data) {
            if (err) {
                logger.error("Error while posting like for the event id: " + req.params.context_id, err);
                reject(err);
            } else {
                logger.info("Like data object: " + data);
                resolve(data);
            }
        });
    });
});

router.get('/event-summaries/:event_id/like', function (req) {
    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        collaborationService.getLikersDetail(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching the liker's detail for the event" + req.params.event_id);
                reject(err);
            } else {
                resolve(JSON.parse(data));
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
        if (req.baseUrl.endsWith('like')) {
            if (constants.const.POST == req.method) {
                if (utils.checkNullEmpty(req.body.objectId)) {
                    utils.generateValidationError("Object id is required");
                }
                if (utils.checkNullEmpty(req.body.objectType)) {
                    utils.generateValidationError("Object type is required");
                }
                if (utils.checkNullEmpty(req.body.contextType)) {
                    utils.generateValidationError("Context type is required");
                }
                if (utils.checkNullEmpty(req.body.src)) {
                    utils.generateValidationError("Source is required");
                }
                if (utils.checkNullEmpty(req.body.type)) {
                    utils.generateValidationError("Type is required");
                }
                if (utils.checkNullEmpty(req.params.event_id)) {
                    utils.generateValidationError("Event id is required.");
                }
            } else if (constants.const.GET == req.method) {
                if (utils.checkNullEmpty(req.query.object_id)) {
                    utils.generateValidationError("Object id is required");
                } else if (utils.checkNullEmpty(req.query.object_type)) {
                    utils.generateValidationError("Object type is required");
                }
            }
        } else {
            if (utils.checkNullEmpty(req.query.cn_domain_id)) {
                utils.generateValidationError("Current domain id is required.")
            }
            if (utils.checkNullEmpty(req.query.user_id)) {
                utils.generateValidationError("user id is required.");
            }
            if (utils.checkNullEmpty(req.params.event_id)) {
                utils.generateValidationError("Event id is required.");
            }
        }
    }
}

module.exports = router.getRouter();
