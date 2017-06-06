/**
 * Created by yuvaraj on 10/05/17.
 */
'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    queryBuilder = require(path.resolve('./lib/builder/materialQueryBuilder', '')),
    materialSearch = require(path.resolve('./lib/restclient/material/materialSearch', ''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/materialSearch', function (req, res, next) {

    var model = queryBuilder.buildMaterialSearchParams(req);

    materialSearch.getAllMaterials(model, req, res, function (err, data) {
        if (err) {
            logger.error('Error in getting material list ' + err.message);
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});

module.exports = router;
