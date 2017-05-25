(function (invdetail) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    invdetail.getInvDetail = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.inv_detail.url,
            method: config.dashconfig.inv_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            qs: {
                entity_id:q.eid,
                material_id:q.mid,
                mtags:q.mtags,
                etags:q.etags,
                abty:q.abty,
                offset:q.offset,
                size:q.size
            },
            timedOut: config.dashconfig.inv_detail.timeout
        };
        //here call to logistimo api for inventory stock view
        restclient.callApi(options,callback);
    };

    invdetail.getSingleInvDetail = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.single_inv_detail.url,
            method: config.dashconfig.inv_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            qs: {
                entity_id:q.eid,
                material_id:q.mid,
                offset:q.offset,
                size:q.size
            },
            timedOut: config.dashconfig.single_inv_detail.timeout
        };
        //here call to logistimo api for inventory stock view
        restclient.callApi(options,callback);
    };

})(module.exports);