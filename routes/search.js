/**
 * Created by yuvaraj on 10/05/17.
 */
'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    queryBuilder = require(path.resolve('./lib/builder/searchQueryBuilder', '')),
    searchService = require(path.resolve('./lib/restclient/search/search', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils'));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/search/material', function (req, res) {

    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.error(exception);
            reject({status:400, message: exception.message});
            return;
        }
        var model = queryBuilder.buildSearchParams(req);
        searchService.getAllMaterials(model, req, res, function (err, data) {
            if (err) {
                logger.error('Error in getting material list ' + err.message);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
});

router.get('/search/entity', function (req, res) {

    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.error(exception);
            reject({status:400, message: exception.message});
            return;
        }
        var model = queryBuilder.buildSearchParams(req);
        searchService.getAllEntities(model, req, res, function (err, data) {
            if (err) {
                logger.error('Error in getting entity list ' + err.message);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });

});

function validateRequestParams(req) {
    if(utils.checkNullEmpty(req.query.tags) && utils.checkNullEmpty(req.query.q)) {
        throw new Error("One of search field or tag is mandatory");
    }
}


module.exports = router.getRouter();
