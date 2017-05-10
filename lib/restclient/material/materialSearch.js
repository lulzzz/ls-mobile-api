/**
 * Created by yuvaraj on 10/05/17.
 */
//function to get list of entities based on user input
//module.exports = entitySearch;

(function (material) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    material.getAllMaterials = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.material_search.url,
            method: config.dashconfig.dash_inv.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user
            },
            qs: {
                dId:q.dId,
                q:q.q,
                tags:q.tags,
                offset: q.offset,
                size: q.size,
                mt: q.mt
            },
            timedOut: config.dashconfig.dash_inv.timeout
        };
        //here call to logistimo api for dashboard inv api
        restclient.callApi(options,callback);
    }

})(module.exports);