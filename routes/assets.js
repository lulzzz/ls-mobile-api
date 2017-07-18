'use strict';

var path = require("path"),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
    assetService = require(path.resolve('./lib/restclient/assets/asset', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    assetBuilder = require(path.resolve('./lib/builder/assetRespBuilder', '')),
    queryBuilder = require(path.resolve('./lib/builder/assetQueryBuilder', '')),
    Promise = require('bluebird'),
    utils = require(path.resolve('./lib/utils/common/common-utils', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/assets', function (req) {

    return new Promise(function (resolve, reject) {
        if (utils.checkNullEmpty(req.query.did) && utils.checkNullEmpty(req.query.eid)) {
            reject({status:400, message: "Invalid request"});
            return;
        }
        var model = queryBuilder.buildTempDataParams(req);
        assetService.getAssetsForDomain(model, function (err, data) {
            if (err) {
                logger.error("Error while fetching the list of assets");
                reject(err);
            } else {
                var obj = JSON.parse(data);
                var asset = [];
                var tempData = obj.data;
                if (tempData.length > 0) {
                    tempData.forEach(function (data) {
                        var assetData = {};
                        assetData.vId = data.vId;
                        assetData.dId = data.dId;
                        asset.push(assetData);
                    });
                    model = queryBuilder.buildAssetListingParams(req, asset);
                    assetService.getAssetsListingsData(model, function (err, data) {
                        if (err) {
                            logger.error("Error while fetching the data");
                            reject(err);
                        } else {
                            var assets = assetBuilder.buildAssetData(data, tempData, model.offset);
                            resolve(assets);
                        }
                    });
                } else {
                    var offset = req.query.of ? req.query.of : constants.const.OFFSET;
                    var assets = assetBuilder.buildAssetData(JSON.stringify(asset), tempData, offset);
                    resolve(assets);
                }
            }
        });
    });

});

router.get('/assets/detail', function (req) {
    return new Promise(function(resolve, reject) {
        if (utils.checkNullEmpty(req.query.did) || utils.checkNullEmpty(req.query.vid) || utils.checkNullEmpty(req.query.mpid)) {
            reject({status: 400, message: "Invalid request"});
        }
        var queryModel = queryBuilder.buildTempAlertParams(req);
        // fetch recent alerts and temperature for assets
        var a = getRecentAlerts(queryModel),
            b = getTemperatures(queryModel);
        Promise.all([a, b]).then(function (result) {
            logger.info("Received asset details successfully");
            var model = assetBuilder.buildAssetDetailsModel(result);
            resolve(model);
        }).catch(function (err) {
            logger.error("\n" + err.stack);
            reject(err);
        });
    });

});

function getRecentAlerts(queryModel) {
    return new Promise(function (resolve, reject) {
        assetService.getRecentAlerts(queryModel, function (err, data) {
            if (err) {
                logger.error("Error while fetching the alerts for assets");
                reject(err);
            } else {
                var assetData = assetBuilder.buildRecentAlertModel(data);
                if (assetData) {
                    resolve(assetData);
                } else {
                    reject("Error while fetching the alerts for assets");
                }
            }
        })
    })
}

function getTemperatures(queryModel) {
    return new Promise(function (resolve, reject) {
        assetService.getTemperatureData(queryModel, function (err, data) {
            if (err) {
                logger.error("Error while fetching temperature data for assets");
                reject(err);
            } else {
                var assetData = assetBuilder.buildAssetTempDataModel(data, queryModel);
                if (assetData) {
                    resolve(assetData);
                } else {
                    reject("Error while fetching temperature data for assets");
                }
            }
        });
    })
}

module.exports = router.getRouter();
