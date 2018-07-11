/**
 * Created by yuvaraj on 25/06/18.
 */
(function (orderService) {
    var path = require('path'),
        restClient = require(path.resolve('./lib/restclient/restclient', '')),
        config = require(path.resolve('./conf', ''));
    
    orderService.getOrders = function(queryModel, callback) {
        var options = {
            url: config.baseurl + config.orderConfig.get_order.url +queryModel.entityId,
            method: config.orderConfig.get_order.method,
            timeout: config.orderConfig.get_order.timeout,
            headers: {
                'Content-Type': 'application/json',
                'x-access-user': queryModel.user,
                'Accept-Charset': 'utf-8',
                'x-real-ip': queryModel.ip,
                'x-request-id': queryModel.reqId
            },
            qs: queryModel,
            time: true
        };
        restClient.callApi(options, callback);
    }
    
})(module.exports);