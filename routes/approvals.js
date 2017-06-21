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
    orderResBuilder = require(path.resolve('./lib/builder/orderResBuilder', '')),
    convQueryBuilder = require(path.resolve('./lib/builder/conversationQueryBuilder','')),
    conversationService = require(path.resolve('./lib/restclient/conversation/conversation',''));

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
            data = "Approval req with id "+req.params.approval_id+" updated successfully"
            logger.info(data);
            res.status(200).send(data);
        }
    })
});

router.put('/approvals/:approval_id/conversation', function (req, res, next) {
    var model = convQueryBuilder.addMessageParam(req);
    if (req.body.conversation_id) {
        var tempReq = {};
        tempReq.conversationId = req.body.conversation_id;
        tempReq.message = req.body.message;
        req.body = tempReq;
        conversationService.addMessage(model, req, function (err, data) {
            if (err) {
                logger.error('Error in adding message ' + err.message);
                next(err);
            } else if (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).send(data);
            }
        });
    }else{
        var tempReq = {};
        tempReq.data= req.body.message;
        req.body = tempReq;
        conversationService.addEditMessage(model, req, function (err, data) {
            if (err) {
                logger.error('Error in adding message ' + err.message);
                next(err);
            } else if (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).send(data);
            }
        });
    }
});

router.get('/approvals/conversation/messages', function (req, res, next) {
    var model = convQueryBuilder.getMessageParam(req);
    conversationService.getMessages(model, req, function (err, data) {
        if (err) {
            logger.error('Error in adding message ' + err.message);
            next(err);
        } else if (data) {
            res.append('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});

module.exports = router;
