/**
 * Created by yuvaraj on 10/05/17.
 */
'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    urlDecoder = require('../lib/utils/urldecoder'),
    MaterialSearchModel = require('../model/MaterialSearchModel'),
    materialSearch = require('../lib/restclient/material/materialSearch');

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/materialSearch', function (req, res, next) {

    var queryModel = new MaterialSearchModel();
    queryModel.dId = req.query.dId;
    queryModel.tags = req.query.tags;
    queryModel.q = req.query.q;
    queryModel.offset = req.query.offset;
    queryModel.size = req.query.size;
    queryModel.user = req.headers['x-access-user'];

    materialSearch.getAllMaterials(queryModel,req,res,function (err,data) {
        if (err) {
            logger.error('Error in getting material list '+err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });

});

module.exports = router;
