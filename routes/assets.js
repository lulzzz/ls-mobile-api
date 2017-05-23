'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    assetService = require('../lib/restclient/assets/asset'),
    urlDecoder = require('../lib/utils/urldecoder'),
    assetBuilder = require('../lib/builder/assetRespBuilder'),
    queryBuilder = require('../lib/builder/assetQueryBuilder');

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
               } else if(data) {
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
    var queryModel = queryBuilder.buildTempAlertParams(req),
        count = 0, alertData, tempData;

    // fetch recent alerts and temperature for assets
    getRecentAlerts(queryModel, processData);
    getTemperatures(queryModel, processData);

    // callback method
    function processData(results, type) {
       if(type == 'oa') {
           if(results) {
               alertData = results;
               count++;
           } else {
               res.status(400).send("Error while fetching the data");
           }
       } else if(type == 'ot') {
           if(results) {
               tempData = results;
               count++;
           } else {
               res.status(400).send("Error while fetching the data");
           }
       }
        if(count > 1) {
            alertData.temp = tempData.temp;
            res.status(200).send(alertData);
        }
    }
});

function getRecentAlerts(queryModel, callback) {
   assetService.getRecentAlerts(queryModel, function (err, data) {
        if (err) {
            logger.error("Error while fetching the alerts for assets");
            callback(null, 'oa');
        } else if (data) {
            var assetData = JSON.parse(data);
            callback(assetBuilder.buildRecentAlertModel(assetData), 'oa');
        }
    });
}

function getTemperatures(queryModel, callback) {
    assetService.getTemperatureData(queryModel, function (err, data) {
        if (err) {
            logger.error("Error while fetching temperature data for assets");
            callback(null, 'ot');
        } else if (data) {
            var assetData = JSON.parse(data);
            callback(assetBuilder.buildAssetTempDataModel(assetData, queryModel), 'ot');
        }
    });
}

module.exports = router;
