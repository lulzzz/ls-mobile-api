'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
    decoder = require(path.resolve('./lib/utils/urldecoder', '')),
    service = require(path.resolve('./lib/restclient/events/eventService', ''));

router.use(function (req, res, next) {
    req.url = decoder.decodeurl(req);
    return next();
});

router.get('/event-summaries', function (req) {

    return new Promise(function (resolve, reject) {
        service.getEventSummaries(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching event summaries for user: " + req.header('x-access-user'));
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
});

router.get('/event-summaries/breakdown', function (req) {

    return new Promise(function (reject, resolve) {
        service.getEventsByType(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching event summaries for event " + req.query.event_type);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
});

module.exports = router.getRouter();
