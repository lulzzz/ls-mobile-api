'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    invdetail = require(path.resolve('./lib/restclient/inventory/invdetail', '')),
    queryBuilder = require(path.resolve('./lib/builder/inventoryQueryBuilder', '')),
    commonUtils = require(path.resolve('./lib/utils/common/common-utils',''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/inventory', function (req, res, next) {
    try {
        validate(req);
    } catch(e){
        res.status(400).send(e.message);
        return;
    }
    var queryModel = queryBuilder.buildInvParams(req);    
    
    invdetail.getInvDetail(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory stock view: ' + err.message);
            next(err);
        } else if (data) {
            var tempData = {};
            data = JSON.parse(data);
            tempData.data = [];
            tempData.total = data.numFound;
            tempData.size = data.size;
            tempData.offset = data.offset;
            data.results.forEach(function(data){
                var dt ={}
                dt.mId = data.mId;
                dt.mnm = data.mnm;
                dt.eId = data.kId;
                dt.tc = data.stk;
                dt.a = data.astk;
                dt.av = data.atpsk;
                dt.it = data.tstk;
                dt.min = data.reord;
                dt.max= data.max;
                dt.lu= data.t;
                dt.se = data.event;
                dt.enm = data.enm
                dt.ed=data.period;
                tempData.data.push(dt);
            });
            res.append('Content-Type', 'application/json');
            res.status(200).send(tempData);
        }
    });
});

router.get('/inventory/entity/:entity_id/:material_id', function (req, res, next) {
    var queryModel = queryBuilder.buildInvDetailParams(req);
    invdetail.getSingleInvDetail(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in inventory stock view: ' + err.message);
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});

function validate(req){
    if(commonUtils.checkNull(req.query.entity_id) && commonUtils.checkNull(req.query.material_id) ){
            throw new TypeError("Request is invalid");
    }
    if(commonUtils.checkNotNullEmpty(req.query.entity_id) && commonUtils.checkNotNullEmpty(req.query.material_id) ){
        throw new TypeError("Request is invalid");
    }
    if(commonUtils.checkNotNullEmpty(req.query.entity_id) && commonUtils.checkNotNullEmpty(req.query.etags)){
        throw new TypeError("Request is invalid");
    }
    if(commonUtils.checkNotNullEmpty(req.query.material_id) && commonUtils.checkNotNullEmpty(req.query.mtags)){
        throw new TypeError("Request is invalid");
    }
}

module.exports = router;
