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
        var key = "Bearer 3898b4ec126e4f2e81543acff59c72e6";
        service.getIntents(key, req, function(err, data) {
            if(err) {
                console.log("Error occurred: "+ err);
                reject(err);
            } else {
                var resData = JSON.parse(data);
                var parameters = resData.result.parameters;
                if (utils.checkNotNullEmpty(parameters) && utils.checkNotNullEmptyArray(parameters.TransactionType) &&
                    utils.checkNotNullEmpty(parameters.quantity) && utils.checkNotNullEmpty(parameters.Material) &&
                    utils.checkNotNullEmpty(parameters.transactionDate) && utils.checkNotNullEmpty()) {
                    service.validateMaterialExists(parameters.Material, parameters.entity, function (err, data) {
                        if (err) {
                            console.log("err:" + err);
                            reject(err);
                        } else {
                            if(data) {
                                console.log("success");
                                resolve(builder.buildIntentResponse(resData));
                            } else {
                                resolve(parameters.Material + " is not available at " + parameters.entity);
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
    return new Promise(function(resolve, reject) {
        req.body.lang = "en";
        req.body.sessionId = req.headers['x-access-token'];
        var key = "Bearer 43bb579106e44bcfb38a29e64d9bc95e";
        console.log("body: " + req.body.query);
        service.getIntents(key, req, function(err, data) {
            if(err) {
                console.log("err: " + err);
                reject(err);
            } else {
                console.log("Entered into data part:");
                var response = JSON.parse(data);
                /*if(!validateParameters(response)) {
                    var parameters = response.result.parameters;
                    console.log("params: " + parameters);
                    if(parameters.OrderType == "Purchase") {
                        response.result.fulfillment.speech = "Provide issuing store for this order";
                    } else if(parameters.OrderType == "Sales") {
                        response.result.fulfillment.speech = "Provide receiving store for this order";
                    } else {
                        response.result.fulfillment.speech = "Order type is incorrect. Which type of order would you like to create?";
                    }
                }*/
                resolve(builder.buildIntentResponse(response));
            }
        });
    });
});

router.post('/intents/create_order', function(req) {
    return new Promise(function (resolve, reject) {
        req.body['status'] = "pn";
        req.body['vkioskid'] = "1344724";
        req.body['materials'] = {};
        req.body['signature'] = req.headers['x-access-user'] + (new Date().getTime());
        if(utils.checkNullEmpty(req.query.material)) {
            req.query.material = "3345834";
        }
        if(utils.checkNullEmpty(req.body.kioskid)) {
            req.body['kioskid'] = "1344774";
        }
        console.log("kioskid: " + req.body['kioskid']);
        req.body['materials'][req.query.material] = {q: '' + req.query.quantity, r: null};
        switch(req.query.otype) {
            case "purchase":
                req.body['orderType'] = '1';
                break;
            case "sales":
                req.body['orderType'] = '2';
                break;
        }

        service.createOrder(req, function(err, data) {
            if(err) {
                console(err);
                reject(err);
            } else {
                console.log("Entered: ");
                data = JSON.parse(data);
                console.log("data:" + JSON.stringify(data.items[0].oid));
                var res = "Created a pending order successfully";
                console.log("Data: " + res);
                resolve(res);
            }
        });
    });
});

function validateParameters(data) {
    var parameters = data.result.parameters;
    console.log("parameters: " + JSON.stringify(parameters));
    if(utils.checkNotNullEmpty(parameters)){
        if(utils.checkNotNullEmpty(parameters.OrderType) && utils.checkNotNullEmpty(parameters.Quantity)
        && utils.checkNotNullEmpty(parameters.Date) && utils.checkNotNullEmpty(parameters.Material)
        && utils.checkNotNullEmpty(parameters.Name)) {
            console.log("Validated");
            return false;
        }
    }
    return true;
}
module.exports  = router.getRouter();


