/**
 * Created by naveensnair on 23/02/18.
 */

'use strict'

var path = require("path"),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    domainConfigService = require(path.resolve('./lib/restclient/domain/domainCfgService', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    Promise = require('bluebird'),
    utils = require(path.resolve('./lib/utils/common/common-utils', ''));

    router.use(function (req, res, next) {
        req.url = urlDecoder.decodeurl(req);
        return next();
    });

    router.get('/configurations/assets', function(req) {
       return new Promise(function(resolve, reject) {
           if(utils.checkNullEmpty(req.query.src)) {
               logger.warn("Source is required");
               reject(utils.generateValidationError("Source id is required."));
               return;
           }
           domainConfigService.getAssetSystemConfig(req, function(err, data) {
               if (err) {
                   logger.error("Error while fetching the asset system configuration");
                   reject(err);
               } else {
                   resolve(JSON.parse(data));
               }
           })
       })
    });

    module.exports = router.getRouter();