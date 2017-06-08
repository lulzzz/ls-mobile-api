/**
 * Created by smriti on 23/05/17.
 */

'use strict';

var router = require('express').Router(),
    urlDecoder = require('../lib/utils/urldecoder'),
    approvalService = require('../lib/restclient/approvals/approvalService'),
    queryBuilder = require('../lib/builder/approvalQueryBuilder'),
    logger = require('../lib/utils/log');

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
            res.status(200).send(data);
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
module.exports = router;