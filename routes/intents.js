/**
 * Created by smriti on 17/05/18.
 */

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
    service = require(path.resolve('./lib/restclient/intents/intentService.js','')),
    builder = require(path.resolve('./lib/builder/intentResBuilder.js','')),
    validator = require(path.resolve('./lib/validator/intentValidator.js',''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/intents/transaction', function (req) {
    return new Promise(function(resolve, reject) {
        req.body.lang = "en";
        req.body.sessionId = "123456";
        service.getIntents(req, function(err, data) {
            if(err) {
                console.log("Error occurred: "+ err);
                reject(err);
            } else {
                var resData = JSON.parse(data);
                var parameters = resData.result.parameters;
                if (utils.checkNotNullEmpty(parameters) && utils.checkNotNullEmptyArray(parameters.TransactionType) &&
                    utils.checkNotNullEmpty(parameters.quantity) && utils.checkNotNullEmpty(parameters.material) &&
                    utils.checkNotNullEmpty(parameters.transactionDate) && utils.checkNotNullEmpty()) {
                    service.validateMaterialExists(parameters.material, parameters.entity, function (err, data) {
                        if (err) {
                            console.log("err:" + err);
                            reject(err);
                        } else {
                            if(data) {
                                console.log("success");
                                resolve(builder.buildIntentResponse(resData));
                            } else {
                                resolve(parameters.material + " is not available at " + parameters.entity);
                            }
                        }
                    });
                } else {
                    resolve(builder.buildIntentResponse(resData));
                }
            }
        });
    });
});

router.post('/intents/order', function(req) {
    return new Promise(function(reject, resolve) {
        req.body.lang = "en";
        req.body.sessionId = "123456";
        service.getIntents(req, function(error, data) {
            if(err) {
                console.log("error: " + error);
                reject(err);
            } else {
                var response = JSON.parse(data);
                resolve(builder.buildIntentResponse(response));
            }
        });
    });
});
module.exports  = router.getRouter();


