/**
 * Created by smriti on 23/05/17.
 */

(function (approvalService) {
    "use strict";
    var config = require('../../../conf'),
        restClient = require('../restclient');
    approvalService.getApprovals = function (queryModel, req, callback) {
        var options = {
            url: config.baseurl + config.approvalConfig.get.url,
            method: config.approvalConfig.get.method,
            headers: {
                'x-access-token': req.header('x-access-token'),
                'x-access-user': req.header('x-access-user')
            },
            qs: queryModel,
            timeout: config.approvalConfig.get.timeout
        };
        restClient.callApi(options, callback);
    };

    approvalService.createApprovals = function (req, callback) {
        var options = {
            url: config.baseurl + config.approvalConfig.create.url,
            method: config.approvalConfig.create.method,
            headers: {
                'x-access-token': req.header('x-access-token'),
                'x-access-user': req.header('x-access-user')
            },
            body: req.body,
            timeout: config.approvalConfig.create.timeout
        };
        restClient.callApi(options, callback);
    };
})(module.exports);
