/**
 * Created by yuvaraj on 10/05/17.
 */
//function to get list of entities based on user input
//module.exports = entitySearch;

(function (material) {

    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    material.getAllMaterials = function (q, req, res, callback) {
        var options = {
            url: config.baseurl + config.searchconfig.material_search.url,
            method: config.searchconfig.material_search.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            qs: {
                q: q.q,
                tags: q.tags,
                offset: q.offset,
                size: q.size,
                mt: q.mt
            },
            timedOut: config.searchconfig.material_search.timeout
        };
        //here call to logistimo api for dashboard inv api
        restClient.callApi(options, callback);
    }

})(module.exports);