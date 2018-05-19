/**
 * Created by smriti on 17/05/18.
 */

(function (intentService) {
    var path = require('path'),
        restClient = require(path.resolve('./lib/restclient/restclient', '')),
        config = require(path.resolve('./conf', ''));

        intentService.getIntents = function (key, req, callback) {
        var options = {
            url: config.intentsUrl,
            timeout: 30000,
            method: "POST",
            headers: {
                'Authorization': key,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(req.body)
        };
        restClient.callApi(options, callback);
    };

    intentService.validateMaterialExists = function (material, entity, callback) {
        var options = {
            url: config.baseurl + config.dashconfig.single_inv_detail.url + entity + "/" + material,
            method: config.dashconfig.inv_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId,
                'x-real-ip': q.xforward
            },
            timedOut: config.dashconfig.single_inv_detail.timeout,
            time: true
        };
        restClient.callApi(options, callback);
    };

    intentService.createOrder = function(req, callback) {
        var options = {
            url: config.baseurl + config.orderConfig.create_order.url,
            method: config.orderConfig.create_order.method,
            timeout: config.orderConfig.create_order.timeout,
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