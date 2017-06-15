/**
 * Created by smriti on 23/05/17.
 */

(function (approvalService) {
    "use strict";
    var config = require('../../../conf'),
        restClient = require('../restclient');
    approvalService.getApprovals = function (queryModel, req, callback) {
        var options = {
            url: config.approvalUrl + config.approvalConfig.get.url,
            method: config.approvalConfig.get.method,
            headers: {
                'x-access-token': req.header('x-access-token'),
                'x-access-user': req.header('x-access-user'),
                'x-real-ip': req.header('x-real-ip')
            },
            qs: {
                approver_id: queryModel.approver_id,
                requester_id: queryModel.requester_id,
                approver_status: queryModel.approver_status,
                status: queryModel.status,
                ordered_by: queryModel.ordered_by,
                expiring_in: queryModel.expiring_in,
                type: queryModel.type,
                type_id: queryModel.type_id,
                attribute_key: queryModel.attribute_key,
                attribute_value: queryModel.attribute_value,
                offset: queryModel.offset,
                size: queryModel.size
            },
            timeout: config.approvalConfig.get.timeout
        };
        restClient.callApi(options, callback);
    };

    approvalService.createApprovals = function (req, callback) {
        var options = {
            url: config.approvalUrl + config.approvalConfig.create.url,
            method: config.approvalConfig.create.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': req.header('x-access-user'),
                'x-real-ip': req.header('x-real-ip')
            },
            body: JSON.stringify(req.body),
            timeout: config.approvalConfig.create.timeout
        };
        restClient.callApi(options, callback);
    };

    approvalService.updateApprovalStatus = function (req, callback) {
        var options = {
            url: config.approvalUrl + config.approvalConfig.put.url.replace('{approval_id}',req.params.approval_id),
            method: config.approvalConfig.put.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': req.header('x-access-user'),
                'x-real-ip': req.header('x-real-ip')
            },
            body: JSON.stringify(req.body),
            timeout: config.approvalConfig.put.timeout
        };
        restClient.callApi(options, callback);
    };

})(module.exports);
