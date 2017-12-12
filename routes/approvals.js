/**
 * Created by smriti on 23/05/17.
 */

'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    approvalService = require(path.resolve('./lib/restclient/approvals/approvalService', '')),
    queryBuilder = require(path.resolve('./lib/builder/approvalQueryBuilder', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils','')),
    constants = require(path.resolve('./lib/constants/constants'));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/order-approvals', function (req) {

    return new Promise(function(resolve,reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        var model = queryBuilder.getQueryParams(req);
        approvalService.getApprovals(model, function (err, data) {
            if (err) {
                logger.error("Error while fetching the approvals for query detail:" + model);
                reject(err);
            } else {
                logger.info("Approval detail for query: " + data + " fetched successfully");
                resolve(JSON.parse(data));
            }
        });
    });
});

router.get('/order-approvals/:approval_id', function (req) {

    return new Promise(function(resolve,reject) {
        if(utils.checkNullEmpty(req.params.approval_id)) {
            logger.warn("Approval_id is mandatory");
            reject(utils.generateValidationError("Approval id is required"));
            return;
        }

        approvalService.getApprovalWithDetail(req, function (err, data) {
            if (err) {
                logger.error("Error while fetching the approval-detail for :" + req.params.approval_id);
                reject(err);
            } else {
                logger.info("Approval detail " + data + " fetched successfully");
                resolve(JSON.parse(data));
            }
        });
    });
});

router.post('/order-approvals', function (req,res) {

    return new Promise(function(resolve,reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        approvalService.createApprovals(req, function (err, data) {
            if (err) {
                logger.error("Error while creating approvals" + "\n" + err.stack);
                reject(err);
            } else {
                logger.info("Approval " + data + " created successfully");
                //adding post status code
                res.status(201);
                resolve(JSON.parse(data));
            }
        })
    });
});

router.put('/order-approvals/:approval_id/status', function (req) {

    return new Promise(function(resolve,reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        approvalService.updateApprovalStatus(req, function (err, data) {
            if (err) {
                logger.error("Error while updating approval status" + "\n" + err.stack);
                reject(err);
            } else {
                data = "Approval req with id " + req.params.approval_id + " updated successfully";
                logger.info(data);
                resolve({message: data});
            }
        })
    });
});

function validateRequestParams(req) {
    if(req.baseUrl.endsWith('order-approvals')) {
        if(constants.const.POST == req.method) {
            if (utils.checkNullEmpty(req.body.order_id)) {
                utils.generateValidationError("Order id is required.");
            }
            if (utils.checkNullEmpty(req.body.requester_id)) {
                utils.generateValidationError("Requester id is required.");
            }
            if (req.body.requester_id != req.headers['x-access-user']) {
                utils.generateValidationError("Requester id should be same as logged in user id.");
            }
            if (req.body.approval_type != 0 && utils.checkNullEmpty(req.body.approval_type)) {
                utils.generateValidationError("Approval type is required.");
            }
        } else {
            if(utils.checkNullEmpty(req.query.approver_id)) {
                utils.generateValidationError("Approver id required.");
            } if(req.query.approver_id != req.headers['x-access-user']) {
                utils.generateValidationError("Approver id should be same as logged in user id.");
            }
            if(utils.checkNullEmpty(req.query.status)) {
                utils.generateValidationError("Status is required.");
            }
        }
    } else if(req.baseUrl.endsWith('status')) {
        if(utils.checkNullEmpty(req.body.status)) {
            utils.generateValidationError("Status is required.");
        }
        if(utils.checkNullEmpty(req.body.updated_by)) {
            utils.generateValidationError("Updated by is required.");
        }
    }
}

module.exports = router.getRouter();
