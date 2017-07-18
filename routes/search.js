/**
 * Created by yuvaraj on 10/05/17.
 */
'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    queryBuilder = require(path.resolve('./lib/builder/searchQueryBuilder', '')),
    searchService = require(path.resolve('./lib/restclient/search/search', ''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/search/material', function (req, res) {

    return new Promise(function (resolve, reject) {
        var model = queryBuilder.buildSearchParams(req);
        searchService.getAllMaterials(model, req, res, function (err, data) {
            if (err) {
                logger.error('Error in getting material list ' + err.message);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
});

router.get('/search/entity', function (req, res) {

    return new Promise(function (resolve, reject) {
        var model = queryBuilder.buildSearchParams(req);
        searchService.getAllEntities(model, req, res, function (err, data) {
            if (err) {
                logger.error('Error in getting entity list ' + err.message);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

});


module.exports = router.getRouter();
