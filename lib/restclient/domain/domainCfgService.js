/**
 * Created by smriti on 22/11/17.
 */

(function(domainCfgService) {
    var path = require('path'),
        config = require(path.resolve('./conf/')),
        restClient = require(path.resolve('./lib/restclient/restclient','')),
        utils = require(path.resolve('./lib/utils/common/common-utils',''));

    domainCfgService.get = function(req, domainIds, callback) {
        var options = {
            url: config.baseurl + config.domainConfig.get.url,
            method: config.domainConfig.get.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-request-id': req.headers['x-request-id'],
                'x-access-user': req.header("x-access-user")
            },
            qs: {
                domain_ids: domainIds
            },
            timeout: config.domainConfig.get.timeout,
            time: true
        };
        restClient.callApi(options, callback);
    }
})
(module.exports);