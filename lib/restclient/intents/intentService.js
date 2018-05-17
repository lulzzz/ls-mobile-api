/**
 * Created by smriti on 17/05/18.
 */

(function (intentService) {
    var path = require('path'),
        restClient = require(path.resolve('./lib/restclient/restclient', '')),
        config = require(path.resolve('./conf', '')),
        key_token = "Bearer 3898b4ec126e4f2e81543acff59c72e6";

        intentService.getIntents = function (req, callback) {
        var options = {
            url: config.intentsUrl,
            timeout: 3000,
            method: "POST",
            headers: {
                'Authorization': key_token,
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
    }

})(module.exports);