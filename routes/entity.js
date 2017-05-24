/**
 * Created by yuvaraj on 08/05/17.
 */
'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    urlDecoder = require('../lib/utils/urldecoder'),
    EntitySearchModel = require('../model/EntitySearchModel'),
    entitySearch = require('../lib/restclient/entity/entitySearch');

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/entitySearch', function (req, res, next) {

    var queryModel = new EntitySearchModel();
    queryModel.dId = req.query.dId;
    queryModel.eid = req.query.entity_id;
    queryModel.tags = req.query.tags;
    queryModel.q = req.query.q;
    queryModel.offset = req.query.offset;
    queryModel.size = req.query.size;
    queryModel.user = req.headers['x-access-user'];

    entitySearch.getAllEntities(queryModel, req, res, function (err, data) {
        if (err) {
            logger.error('Error in getting entity list ' + err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
        res.status(400).send("Error while fetching the entity list in domain " + queryModel.dId);
    });

});

module.exports = router;
