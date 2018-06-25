/**
 * Created by yuvaraj on 25/06/18.
 */
(function (orderService) {
    var path = require('path'),
        restClient = require(path.resolve('./lib/restclient/restclient', '')),
        config = require(path.resolve('./conf', ''));
    
    orderService.getOrders = function(req, callback) {
        var options = {
            url: config.baseurl + config.orderConfig.get_order.url,
            method: config.orderConfig.get_order.method,
            timeout: config.orderConfig.get_order.timeout,
            headers: {
                'Content-Type': 'application/json',
                'x-access-user': req.headers['x-access-user'],
                'Accept-Charset': 'utf-8'
            },
            time: true,
            body: JSON.stringify(req.body)
        };
        restClient.callApi(options, callback);
    }
    
})(module.exports);