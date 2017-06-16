/**
 * Created by smriti on 23/05/17.
 */

'use strict';

var router = require('express').Router(),
    path = require('path'),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    approvalService = require(path.resolve('./lib/restclient/approvals/approvalService', '')),
    queryBuilder = require(path.resolve('./lib/builder/approvalQueryBuilder', '')),
    orderService = require(path.resolve('./lib/restclient/orders/orderService', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
    approvalResBuilder = require(path.resolve('./lib/builder/approvalResBuilder', '')),
    orderResBuilder = require(path.resolve('./lib/builder/orderResBuilder', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/approvals', function (req, res, next) {
    var model = queryBuilder.getQueryParams(req);
    approvalService.getApprovals(model, req, function (err, data) {
        if (err) {
            logger.error("Error while fetching the approvals for approver:" + model.approver_id);
            next(err);
        } else if (data) {
            var ids = orderResBuilder.getOrderIds(data);
            if (ids != "") {
                orderService.getOrderMetaData(ids, req, function (err, orders) {
                    if (err) {
                        logger.error("Error while fetching the order metadata");
                        next(err);
                    } else if (orders) {
                        var model = approvalResBuilder.buildApprovalData(data, orders);
                        if (model != undefined) {
                            res.status(200).send(model);
                        } else {
                            res.status(500).send("Error while fetching the data");
                        }
                    }
                });
            } else {
                res.status(500).send("error while fetching the order id's from approval list");
            }
        }
    });
});

router.post('/approvals', function (req, res, next) {
    approvalService.createApprovals(req, function (err, data) {
        if (err) {
            logger.error("Error while creating approvals" + "\n" + err.stack);
            next(err);
        } else if (data) {
            logger.info("Approval " + data + " created successfully");
            res.status(200).send(data);
        }
    })
});

router.put('/approvals/:approval_id/status', function (req, res, next) {
    approvalService.updateApprovalStatus(req, function (err, data) {
        if (err) {
            logger.error("Error while updating approval status" + "\n" + err.stack);
            next(err);
        } else if (data != null) {
            data = "Approval req with id " + req.params.approval_id + " updated successfully";
            logger.info(data);
            res.status(200).send(data);
        }
    })
});


router.get('/approvals/items', function (req, res, next) {
    orderService.getDemandItems(req, function (err, data) {
       if(err) {
           logger.error("Error while fetching the demand items for order: " + req.query.oid + err);
           next(err);
       }  else if(data) {
           var items = orderResBuilder.buildDemandItems(data);
           if(items != undefined) {
               res.status(200).send(items);
           } else {
               res.status(500).send("Error while fetching demand items for order: " + req.query.oid);
           }
       }
    });
});
module.exports = router;
