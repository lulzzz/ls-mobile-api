/**
 * Created by smriti on 23/05/17.
 */

'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    approvalService = require(path.resolve('./lib/restclient/approvals/approvalService', '')),
    queryBuilder = require(path.resolve('./lib/builder/approvalQueryBuilder', '')),
    logger = require(path.resolve('./lib/utils/log', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/order-approvals', function (req) {
    //TODO:validation
    return new Promise(function(resolve,reject) {
        var model = queryBuilder.getQueryParams(req);
        approvalService.getApprovals(model, function (err, data) {
            if (err) {
                logger.error("Error while fetching the approvals for query detail:" + model);
                reject(err);
            } else {
                logger.info("Approval detail for query: " + data + " fetched successfully");
                resolve(data);
            }
        });
    });
});

router.get('/order-approvals/:approval_id', function (req) {

    return new Promise(function(resolve,reject) {
        approvalService.getApprovalWithDetail(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching the approval-detail for :" + req.params.approval_id);
                reject(err);
            } else if (data) {
                logger.info("Approval detail " + data + " fetched successfully");
                resolve(data);
            }
        });
    });
});

router.post('/order-approvals', function (req) {

    return new Promise(function(resolve,reject) {
        approvalService.createApprovals(req, function (err, data) {
            if (err) {
                logger.error("Error while creating approvals" + "\n" + err.stack);
                reject(err);
            } else if (data) {
                logger.info("Approval " + data + " created successfully");
                resolve(data);
            }
        })
    });
});

router.put('/order-approvals/:approval_id/status', function (req) {

    return new Promise(function(resolve,reject) {
        approvalService.updateApprovalStatus(req, function (err, data) {
            if (err) {
                logger.error("Error while updating approval status" + "\n" + err.stack);
                reject(err);
            } else if (data != null) {
                data = "Approval req with id " + req.params.approval_id + " updated successfully";
                logger.info(data);
                resolve(data);
            }
        })
    });
});

module.exports = router.getRouter();
