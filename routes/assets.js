'use strict';

var router = require('express').Router(),
    path = require("path"),
    logger = require(path.resolve('./lib/utils/log', '')),
    assetService = require(path.resolve('./lib/restclient/assets/asset', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    assetBuilder = require(path.resolve('./lib/builder/assetRespBuilder', '')),
    queryBuilder = require(path.resolve('./lib/builder/assetQueryBuilder', '')),
    Promise = require('bluebird');

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/assets', function (req, res, next) {
    var model = queryBuilder.buildTempDataParams(req);
    if (model == undefined) {
        res.status(400).send("Mandatory fields are empty.");
    }
    assetService.getAssetsForDomain(model, function (err, data) {
        if (err) {
            logger.error("Error while fetching the list of assets");
            next(err);
        } else if (data) {
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
                        next(err);
                    } else if (data) {
                        var assets = assetBuilder.buildAssetData(data, tempData, model.offset);
                        res.append('Content-Type', 'application/json');
                        res.status(200).send(assets);
                    }
                });
            } else {
                var offset = req.query.of ? req.query.of : constants.const.OFFSET;
                var assets = assetBuilder.buildAssetData(JSON.stringify(asset), tempData, offset);
                res.status(200).send(assets);
            }
        }
    });

});

router.get('/assets/detail', function (req, res) {
    var queryModel = queryBuilder.buildTempAlertParams(req);
    if (queryModel == undefined) {
        res.status(400).send("Mandatory fields are empty.");
    }
    // fetch recent alerts and temperature for assets
    var a = getRecentAlerts(queryModel),
        b = getTemperatures(queryModel);
    Promise.all([a, b]).then(function (result) {
        logger.info("Received asset details successfully");
        var model = assetBuilder.buildAssetDetailsModel(result);
        res.status(200).send(model);
    }).catch(function (err) {
        logger.error("\n" + err.stack);
        res.status(500).send("Error while fetching the asset details");
    });

});

function getRecentAlerts(queryModel) {
    return new Promise(function (resolve, reject) {
        assetService.getRecentAlerts(queryModel, function (err, data) {
            if (err) {
                logger.error("Error while fetching the alerts for assets");
                reject(err);
            } else if (data) {
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
            } else if (data) {
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

module.exports = router;
