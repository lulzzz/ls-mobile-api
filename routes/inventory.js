'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    invdetail = require(path.resolve('./lib/restclient/inventory/invdetail', '')),
    queryBuilder = require(path.resolve('./lib/builder/inventoryQueryBuilder', ''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/inventory', function (req, res, next) {
    var queryModel = queryBuilder.buildInvParams(req);

    invdetail.getInvDetail(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory stock view: ' + err.message);
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
        res.status(400).send("Error while fetching the inventory stock view in domain " + queryModel.dId);
    });

});

router.get('/inventory/detail', function (req, res, next) {

    var queryModel = queryBuilder.buildInvDetailParams(req);

    invdetail.getSingleInvDetail(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory stock view: ' + err.message);
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
        res.status(400).send("Error while fetching the inventory details for entity: " +
            queryModel.eid + " in domain " + queryModel.dId);
    });

});

module.exports = router;
