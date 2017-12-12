/**
 * Created by smriti on 31/10/17.
 */

var path = require('path'),
    router = require(path.resolve('./lib/expressive','')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    utils = require(path.resolve('./lib/utils/common/common-utils','')),
    mediaService = require(path.resolve('./lib/restclient/media/mediaService','')),
    logger = require(path.resolve('./lib/utils/logger','')),
    constants = require(path.resolve('./lib/constants/constants',''));

router.use(function(req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/media', function(req) {
    return new Promise(function (resolve, reject) {
        if(utils.checkNotNullEmpty(req.query.object_id)) {
            mediaService.getMedia(req,getObjectId(req), function(err, data) {
                if(err) {
                    logger.error(err);
                    reject({status: 500, message: err});
                } else {
                    if(utils.checkNullEmpty(data)) {
                        resolve({items: []});
                    } else {
                        resolve(JSON.parse(data));
                    }
                }
            });
        } else {
            logger.warn("Object id is required");
            reject({status: 400, message: "Object id is required."});
        }
    });

});

function getObjectId(req) {
    if(utils.checkNotNullEmpty(req.query.object_type) && req.query.object_type == 'domain') {
        return constants.const.DOMAIN + req.query.object_id;
    }
    return req.query.object_id;
}
module.exports = router.getRouter();