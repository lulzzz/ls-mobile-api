'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    urldecoder = require('../lib/utils/urlDecoder'),
    InvDetailQueryModel = require('../model/InvDetailQueryModel'),
    invdetail = require('../lib/restclient/inventory/invdetail');

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urldecoder.decodeURL(req);
    return next();
});

router.get('/inventory', function (req, res, next) {

    var queryModel = new InvDetailQueryModel();
    queryModel.dId = req.query.dId;
    queryModel.eid = req.query.entity_id;
    queryModel.mid = req.query.material_id;
    queryModel.mtags = req.query.mtags;
    queryModel.etags = req.query.etags;
    queryModel.abty = req.query.abty;
    queryModel.offset = req.query.offset;
    queryModel.size = req.query.size;

    invdetail.getInvDetail(queryModel,req,res,function (err,data) {
        if (err) {
            logger.error('Error in inventory stock view: '+err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });

});

module.exports = router;
