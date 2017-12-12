'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    decoder = require(path.resolve('./lib/utils/urldecoder', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
    collaborationService = require(path.resolve('./lib/restclient/collaboration/collaborationService'));

router.use(function (req, res, next) {
    req.url = decoder.decodeurl(req);
    return next();
});

router.get('/collaboration/likes/:object_type/:object_id', function(req) {
    return new Promise(function(resolve, reject) {
        collaborationService.getLikesOnEvent(req, function(err, data) {
           if(err) {
               logger.error("Error while fetching the likes for an event " + req.query.context_id, err );
               reject(err);
           } else {
               resolve(JSON.parse(data));
           }
        });
    });
});

module.exports = router.getRouter();