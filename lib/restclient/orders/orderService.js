/**
 * Created by smriti on 05/06/17.
 */

(function (orderService) {
    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient'));

    orderService.getOrderMetaData = function (orderIds, req, callback) {
        var options = {
            url: config.baseurl + config.ordersConfig.getMetadata.url,
            method: config.ordersConfig.getMetadata.method,
            headers: {
                'x-access-user': req.header('x-access-user'),
                'x-access-token': req.header('x-access-token'),
                'x-real-ip': req.header('x-real-ip')
            },
            qs: {
                orderIds: orderIds
            },
            timeOut: config.ordersConfig.getMetadata.timeout
        };
        restClient.callApi(options, callback);
    };

    orderService.getOrder = function (orderIds, req, callback) {
        var options = {
            url: config.baseurl + config.ordersConfig.get.url,
            method: config.ordersConfig.get.method,
            headers: {
                'x-access-user': req.header('x-access-user'),
                'x-access-token': req.header('x-access-token')
            },
            qs: orderIds,
            timeOut: config.ordersConfig.get.timeout
        };
        restClient.callApi(options, callback);
    };

    orderService.getDemandItems = function (req, callback) {
        var options = {
            url: config.baseurl + config.ordersConfig.getItems.url + req.query.oid + "/items",
            method: config.ordersConfig.getItems.method,
            headers: {
                'x-access-user': req.header('x-access-user'),
                'x-access-token': req.header('x-access-token'),
                'x-real-ip': req.header('x-real-ip')
            },
            timeout: config.ordersConfig.getItems.timeout
        };
        restClient.callApi(options, callback);
    }
})
(module.exports);