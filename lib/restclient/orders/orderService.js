/**
 * Created by yuvaraj on 25/06/18.
 */
(function (orderService) {
    var path = require('path'),
        restClient = require(path.resolve('./lib/restclient/restclient', '')),
        config = require(path.resolve('./conf', ''));
    
    orderService.getOrders = function(req, callback) {
        var options = {
            url: config.baseurl + config.orderConfig.get_order.url +req.entityId,
            method: config.orderConfig.get_order.method,
            timeout: config.orderConfig.get_order.timeout,
            headers: {
                'Content-Type': 'application/json',
                'x-access-user': req.user,
                'Accept-Charset': 'utf-8',
                'x-real-ip': req.headers['x-real-ip'],
                'x-request-id': q.reqId
            },
            qs: req,
            time: true
        };
        restClient.callApi(options, callback);
    }
    
})(module.exports);