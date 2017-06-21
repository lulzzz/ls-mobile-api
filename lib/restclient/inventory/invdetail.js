(function (invdetail) {

    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    invdetail.getInvDetail = function (q, req, res, callback) {
        var options = {
            url: config.baseurl + config.dashconfig.inv_detail.url,
            method: config.dashconfig.inv_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId,
                'x-real-ip': q.xforward
            },
            qs: {
                entity_id: q.eid,
                material_id: q.mid,
                mtags: q.mtags,
                etags: q.etags,
                abty: q.abty,
                offset: q.offset,
                size: q.size
            },
            timedOut: config.dashconfig.inv_detail.timeout
        };
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

    invdetail.getSingleInvDetail = function (q, req, res, callback) {
        var options = {
            url: config.baseurl + config.dashconfig.single_inv_detail.url,
            method: config.dashconfig.inv_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            qs: {
                entity_id: q.eid,
                material_id: q.mid,
                offset: q.offset,
                size: q.size
            },
            timedOut: config.dashconfig.single_inv_detail.timeout
        };
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

})(module.exports);
