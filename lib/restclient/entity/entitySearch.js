/**
 * Created by yuvaraj on 08/05/17.
 */
//function to get list of entities based on user input
//module.exports = entitySearch;

(function (entity) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    entity.getAllEntities = function (q, req, res, callback) {
        var options = {
            url: config.baseurl + config.searchconfig.entity_search.url,
            method: config.searchconfig.entity_search.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user
            },
            qs: {
                q: q.q,
                tags: q.tags,
                offset: q.offset,
                size: q.size,
                mt: q.mt
            },
            timedOut: config.searchconfig.entity_search.timeout
        };
        //here call to logistimo api for dashboard inv api
        restclient.callApi(options, callback);
    }

})(module.exports);