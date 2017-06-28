/**
 * Created by smriti on 23/05/17.
 */

'use strict';

var router = require('express').Router(),
    path = require('path'),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    approvalService = require(path.resolve('./lib/restclient/approvals/approvalService', '')),
    queryBuilder = require(path.resolve('./lib/builder/approvalQueryBuilder', '')),
    logger = require(path.resolve('./lib/utils/log', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/order-approvals', function (req, res, next) {
    //TODO:validation
    var model = queryBuilder.getQueryParams(req);
    approvalService.getApprovals(model, function (err, data) {
        if (err) {
            logger.error("Error while fetching the approvals for query detail:" + model);
            next(err);
        } else if (data) {
            logger.info("Approval detail for query: " + model + " fetched successfully");
            res.status(200).send(data);
        }
    });
});

router.get('/order-approvals/:approval_id', function (req, res, next) {
    approvalService.getApprovalWithDetail(req, function (err, data) {
        if (err) {
            logger.error("Error while fetching the approval-detail for :" + req.params.approval_id);
            next(err);
        } else if (data) {
            logger.info("Approval detail " + data + " fetched successfully");
            res.status(200).send(data);
        }
    });
});

router.post('/order-approvals', function (req, res, next) {
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

router.put('/order-approvals/:approval_id/status', function (req, res, next) {
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

module.exports = router;
