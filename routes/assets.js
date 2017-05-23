'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    assetService = require('../lib/restclient/assets/asset'),
    urlDecoder = require('../lib/utils/urldecoder'),
    assetBuilder = require('../lib/builder/assetRespBuilder'),
    queryBuilder = require('../lib/builder/assetQueryBuilder'),
    Promise = require('bluebird');

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/assets', function (req, res, next) {
    var model = queryBuilder.buildTempDataParams(req);
    assetService.getAssetsForDomain(model, function (err, data) {
        if (err) {
            logger.error("Error while fetching the list of assets");
            next(err);
        } else if (data) {
            var obj = JSON.parse(data);
            var asset = [];
            var tempData = obj.data;
            tempData.forEach(function (data) {
                var assetData = [];
                assetData.push(data.vId);
                assetData.push(data.dId);
                asset.push(assetData);
            });
            model = queryBuilder.buildAssetListingParams(req, asset);
            assetService.getAssetsListingsData(model, function (err, data) {
                if (err) {
                    logger.error("Error while fetching the data");
                    next(err);
                } else if (data) {
                    var assetData = JSON.parse(data);
                    var assets = assetBuilder.buildAssetData(assetData, tempData, model.offset);
                    res.append('Content-Type', 'application/json');
                    res.status(200).send(assets);
                }
            });
        }
    });

});

router.get('/assets/detail', function (req, res) {
    var queryModel = queryBuilder.buildTempAlertParams(req);

    // fetch recent alerts and temperature for assets
    var a = getRecentAlerts(queryModel),
        b = getTemperatures(queryModel);
    Promise.all([a, b]).then(function (result) {
        logger.info("Received asset details successfully");
        result[0].temp = result[1].temp;
        res.status(200).send(result[0]);
    }).catch(function (err)  {
        logger.error("Error while fetching asset details " + "\n" + err.stack);
        res.status(400).send("Error while fetching asset details");
    });

});

function getRecentAlerts(queryModel) {
    return new Promise(function (resolve, reject) {
        assetService.getRecentAlerts(queryModel, function (err, data) {
            if (err) {
                logger.error("Error while fetching the alerts for assets");
                reject(err);
            } else if (data) {
                var assetData = JSON.parse(data);
                resolve(assetBuilder.buildRecentAlertModel(assetData))
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
                var assetData = JSON.parse(data);
                resolve(assetBuilder.buildAssetTempDataModel(assetData, queryModel));
            }
        });
    })
}

module.exports = router;
