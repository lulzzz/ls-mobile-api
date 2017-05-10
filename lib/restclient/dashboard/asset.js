/**
 * Created by smriti on 5/2/17.
 */
(function(assetService) {
    "use strict";
    const config = require('../../../conf');
    const restClient = require('../restclient');
    assetService.getAssetsForDomain = function(q, req, res, callback) {
        debugger
        var options = {
            url: config.baseurl + config.dashconfig.dash_ast.url + q.vId + '/' + q.dId,
            method: 'GET',
            headers: {
                'Accept-Charset' : 'utf-8',
                'Content-Type' : 'application/json',
                'x-access-token': q.token
            },
            qs: {
                page: q.page,
                size: q.size
            },
            timedOut: 1000
        };
        restClient.callApi(options,callback);
    }
})
(module.exports)