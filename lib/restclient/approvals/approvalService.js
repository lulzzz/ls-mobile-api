/**
 * Created by smriti on 23/05/17.
 */

(function (approvalService) {
    "use strict";
    var config = require('../../../conf'),
        restClient = require('../restclient');
    approvalService.getApprovals = function (queryModel, callback) {

        var options = {
            url: config.baseurl + config.approvalConfig.get.url,
            method: config.approvalConfig.get.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': queryModel.xforward,
                'x-access-user': queryModel.user
            },
            qs: {
                approver_id: queryModel.approver_id,
                requester_id: queryModel.requester_id,
                status: queryModel.status,
                expiring_in: queryModel.expiring_in,
                type: queryModel.type,
                order_id: queryModel.order_id,
                entity_id: queryModel.entity_id,
                embed: queryModel.embed,
                offset: queryModel.offset,
                size: queryModel.size
            },
            timeout: config.approvalConfig.get.timeout,
            time:true
        };
        restClient.callApi(options, callback);
    };

    approvalService.createApprovals = function (req, callback) {

        var options = {
            url: config.baseurl + config.approvalConfig.create.url,
            method: config.approvalConfig.create.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            body: JSON.stringify(req.body),
            timeout: config.approvalConfig.create.timeout,
            time:true
        };
        restClient.callApi(options, callback);
    };

    approvalService.getApprovalWithDetail = function (req, callback) {

        var embed = {};
        if (typeof req.query.embed !=='undefined' && req.query.embed != null && req.query.embed !== "") {
            embed.push(req.query.embed);
        }
        var options = {
            url: config.baseurl + config.approvalConfig.getdetail.url.replace('{approval_id}',req.params.approval_id),
            method: config.approvalConfig.getdetail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            qs: {
                embed:embed
            },
            timeout: config.approvalConfig.getdetail.timeout,
            time:true
        };
        restClient.callApi(options, callback);
    };

    approvalService.updateApprovalStatus = function (req, callback) {
        var options = {
            url: config.baseurl + config.approvalConfig.put.url.replace('{approval_id}',req.params.approval_id),
            method: config.approvalConfig.put.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            body: JSON.stringify(req.body),
            timeout: config.approvalConfig.put.timeout,
            time:true
        };
        restClient.callApi(options, callback);
    };

})(module.exports);
