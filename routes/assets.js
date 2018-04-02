'use strict';

var path = require("path"),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
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
            logger.warn("One of domain id or entity id is required.");
            reject(utils.generateValidationError("One of domain id or entity id is required."));
            return;
        } else if(utils.checkNullEmpty(req.query.ty) && utils.checkNullEmpty(req.query.monitoring_type)) {
            logger.warn("One of asset type or monitoring type is required.");
            reject(utils.generateValidationError("One of asset type or monitoring type is required."));
            return;
        }
        var model = queryBuilder.buildTempDataParams(req);
        assetService.getAssetsForDomain(model, function (err, data) {
            if (err) {
                logger.error("Error while fetching the list of assets"+err);
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
                            logger.error("Error while fetching the data"+err);
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
            reject(utils.generateValidationError("Device id, vendor id and monitoring point is required."));
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
            reject(err);
        });
    });

});

router.get('/assets/:manufacturer_code/:serial_no/activity', function (req) {
    return new Promise(function(resolve, reject) {
        if (utils.checkNullEmpty(req.params.manufacturer_code) || utils.checkNullEmpty(req.params.serial_no)) {
            reject(utils.generateValidationError("Manufacturer code and serial no is required."));
        }
        var queryModel = queryBuilder.buildAssetActivityParams(req);
        // fetch recent alerts and temperature for assets
        var a = getRecentAlerts(queryModel);
        Promise.all([a]).then(function (result) {
            logger.info("Received asset details successfully");
            var model = assetBuilder.buildAssetActivityModel(result);
            resolve(model);
        }).catch(function (err) {
            reject(err);
        });
    });
});

router.get('/assets/:manufacturer_code/:serial_no/:monitoring_position_id/temperature', function (req) {
    return new Promise(function(resolve, reject) {
        if (utils.checkNullEmpty(req.params.manufacturer_code) || utils.checkNullEmpty(req.params.serial_no)
            || utils.checkNullEmpty(req.params.monitoring_position_id) || utils.checkNullEmpty(req.query.monitoring_type)) {
            reject(utils.generateValidationError("Manufacturer code, serial no, monitoring position id and monitoring type is required."));
        }
        var queryModel = queryBuilder.buildTempSensorParams(req);
        // fetch recent alerts and temperature for assets
        var a = getTemperatures(queryModel);
        Promise.all([a]).then(function (result) {
            logger.info("Received asset details successfully");
            var model = assetBuilder.buildAssetStatusModel(result);
            resolve(model);
        }).catch(function (err) {
            reject(err);
        });
    });
});

router.post('/assets/:manufacturer_code/:serial_no/status', function (req) {
    return new Promise(function (resolve, reject) {
        try {
            validateAssetWorkingStatusParams(req);
        } catch(exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        var queryModel = queryBuilder.buildAssetStatusParams(req);
        assetService.updateAssetStatus(queryModel, function (err, data) {
            if (err) {
                logger.error("Error while updating asset status: "+err);
                reject(err);
            } else {
                data = "Asset status with manufacturer " + req.params.manufacturer_code + " and serial no "+ req.params.serial_no+ " updated successfully";
                logger.info(data);
                resolve({message: data});
            }
        });
    });
});


router.get('/assets/:manufacturer_code/:serial_no', function (req) {
    return new Promise(function (resolve, reject) {
        try {
            validateManfCodeSerialNo(req);
        } catch(exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        var queryModel = queryBuilder.buildAssetDetailsParams(req);
        assetService.getAssetDetail(queryModel, function (err, data) {
            if (err) {
                logger.error("Error while getting asset detail"+err);
                reject(err);
            } else {
                var model = assetBuilder.buildAssetDetailModel(JSON.parse(data));
                resolve(model);
            }
        });
    });
});

function getRecentAlerts(queryModel) {
    return new Promise(function (resolve, reject) {
        assetService.getRecentAlerts(queryModel, function (err, data) {
            if (err) {
                logger.error("Error while fetching the alerts for assets"+err);
                reject(err);
            } else {
                var assetData = assetBuilder.buildRecentAlertModel(data);
                if (assetData) {
                    resolve(assetData);
                } else {
                    logger.error("Error while fetching the alerts for assets \n");
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
                logger.error("Error while fetching temperature data for assets"+err);
                reject(err);
            } else {
                var assetData = assetBuilder.buildAssetTempDataModel(data, queryModel);
                if (assetData) {
                    resolve(assetData);
                } else {
                    logger.error("Error while fetching temperature data for assets \n");
                    reject("Error while fetching temperature data for assets");
                }
            }
        });
    })
}

function validateManfCodeSerialNo (req) {
    if(utils.checkNullEmpty(req.params.serial_no) || utils.checkNullEmpty(req.params.manufacturer_code)) {
        reject(utils.generateValidationError("Asset manufacturer code or serial number is required."))
    }
}

function validateAssetWorkingStatusParams(req){
    validateManfCodeSerialNo(req);
    if (utils.checkNullEmpty(req.body.status_code)) {
        reject(utils.generateValidationError("Asset working status code is mandatory"));
    }
}


module.exports = router.getRouter();
