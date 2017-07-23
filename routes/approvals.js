/**
 * Created by smriti on 23/05/17.
 */

'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    approvalService = require(path.resolve('./lib/restclient/approvals/approvalService', '')),
    queryBuilder = require(path.resolve('./lib/builder/approvalQueryBuilder', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
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
            logger.error(exception);
            reject({status: 400, message: exception.message});
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
            logger.error("Approval_id is mandatory");
            reject({status: 400, message: "Approval id is required"});
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

router.post('/order-approvals', function (req) {

    return new Promise(function(resolve,reject) {
        try {
            validateRequestParams(req);
        } catch(exception) {
            logger.error(exception);
            reject({status: 400, message: exception.message});
            return;
        }
        approvalService.createApprovals(req, function (err, data) {
            if (err) {
                logger.error("Error while creating approvals" + "\n" + err.stack);
                reject(err);
            } else {
                logger.info("Approval " + data + " created successfully");
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
            logger.error(exception);
            reject({status: 400, message: exception.message});
            return;
        }
        approvalService.updateApprovalStatus(req, function (err, data) {
            if (err) {
                logger.error("Error while updating approval status" + "\n" + err.stack);
                reject(err);
            } else {
                data = "Approval req with id " + req.params.approval_id + " updated successfully";
                logger.info(data);
                resolve(data);
            }
        })
    });
});

function validateRequestParams(req) {
    if(req.baseUrl.endsWith('order-approvals')) {
        if(constants.const.POST == req.method) {
            if (utils.checkNullEmpty(req.body.order_id)) {
                throw new Error("Order id is required.");
            }
            if (utils.checkNullEmpty(req.body.requester_id)) {
                throw new Error("Requester id is required.");
            }
            if (req.body.requester_id != req.headers['x-access-user']) {
                throw new Error("Requester id should be same as logged in user id.");
            }
            if (req.body.approval_type != 0 && utils.checkNullEmpty(req.body.approval_type)) {
                throw new Error("Approval type is required.");
            }
        } else {
            if(utils.checkNullEmpty(req.query.approver_id)) {
                throw new Error("Approver id required.");
            } if(req.query.approver_id != req.headers['x-access-user']) {
                throw new Error("Approver id should be same as logged in user id.");
            }
            if(utils.checkNullEmpty(req.query.status)) {
                throw new Error("Status is required.");
            }
        }
    } else if(req.baseUrl.endsWith('status')) {
        if(utils.checkNullEmpty(req.body.status)) {
            throw new Error("Status is required.");
        }
        if(utils.checkNullEmpty(req.body.message)) {
            throw new Error("Message is required.");
        }
        if(utils.checkNullEmpty(req.body.updated_by)) {
            throw new Error("Updated by is required.");
        }
    }
}

module.exports = router.getRouter();
