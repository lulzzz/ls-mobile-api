'use strict';

var router = require('express').Router(),
   logger = require('../lib/utils/log'),
   urldecoder = require('../lib/utils/urldecoder'),
   dashinv = require('../lib/restclient/dashboard/dashboardinv.js'),
   dashasset = require('../lib/restclient/dashboard/dashboardasset.js'),
   dashinvdetail = require('../lib/restclient/dashboard/dashboardinvdetail.js'),
   InvDashQueryModel = require('../model/InvDashQueryModel');


router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urldecoder.decodeurl(req);
    return next();
});

router.get('/dashboards/inventory', function (req, res, next) {

    var queryModel = new InvDashQueryModel();
    queryModel.dId = req.query.dId;
    queryModel.incetags = req.query.incetags;
    queryModel.exetags = req.query.exetags;
    queryModel.mtags = req.query.mtags;
    queryModel.mnm = req.query.mnm;
    queryModel.loc = req.query.loc;
    queryModel.locty = req.query.locty;
    queryModel.p = req.query.p;
    queryModel.date = req.query.date;
    queryModel.refresh = req.query.refresh;

    dashinv.getInvDashboard(queryModel,req,res,function (err,data) {
        if (err) {
            logger.error('Error in inventory dashboard: '+err.message)
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});


router.get('/dashboards/assets', function (req, res, next) {
    dashasset.getAssetDashboard(function (err,data) {

    });
});

router.get('/dashboards/inventory/detail', function (req, res, next) {

    var queryModel = new InvDashQueryModel();
    queryModel.dId = req.query.dId;
    queryModel.incetags = req.query.incetags;
    queryModel.exetags = req.query.exetags;
    queryModel.mtags = req.query.mtags;
    queryModel.mnm = req.query.mnm;
    queryModel.loc = req.query.loc;
    queryModel.locty = req.query.locty;
    queryModel.p = req.query.p;
    queryModel.date = req.query.date;
    queryModel.refresh = req.query.refresh;
    queryModel.groupby = req.query.groupby;

    dashinvdetail.getInvDetailDashboard(queryModel,req,res,function (err,data) {
        if (err) {
            logger.error('Error in inventory detail dashboard: '+err.message)
            next(err);
        } else if (data){
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});

router.get('/dashboards/assets/detail', function (req, res, next) {



});

module.exports = router;
