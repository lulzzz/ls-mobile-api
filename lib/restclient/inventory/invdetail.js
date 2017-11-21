(function (invdetail) {

    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    invdetail.getInvDetail = function (q, callback) {
        var options = {};
        if (q.eid) {
            options = this.constructInventoryByKioskRequestPayload(q);
        } else if (q.mid) {
            options = this.constructInventoryByMaterialRequestPayload(q)
        }
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

    invdetail.constructInventoryByKioskRequestPayload = function(params) {
        var reqUrl = "entity/" + params.eid;
        return {
            url: config.baseurl + config.dashconfig.inv_detail.url + reqUrl,
            method: config.dashconfig.inv_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': params.user,
                'x-request-id': params.reqId,
                'x-real-ip': params.xforward
            },
            qs: {
                entity_id: params.eid,
                tag: params.mtags,
                abType: params.abType,
                offset: params.offset,
                size: params.size
            },
            timedOut: config.dashconfig.inv_detail.timeout,
            time: true
        };
    };

    invdetail.constructInventoryByMaterialRequestPayload = function(params) {
        var reqUrl = "material/" + params.mid;
        return {
            url: config.baseurl + config.dashconfig.inv_detail.url + reqUrl,
            method: config.dashconfig.inv_detail.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': params.user,
                'x-request-id': params.reqId,
                'x-real-ip': params.xforward
            },
            qs: {
                material_id: params.mid,
                etag: params.etags,
                abType: params.abType,
                offset: params.offset,
                size: params.size,
                loc: params.loc
            },
            timedOut: config.dashconfig.inv_detail.timeout,
            time: true
        };
    }

    invdetail.getSingleInvDetail = function (q, req, res, callback) {
        var options = {
            url: config.baseurl + config.dashconfig.single_inv_detail.url + '/' + req.params.entity_id + '/' + req.params.material_id,
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
                offset: q.offset,
                size: q.size
            },
            timedOut: config.dashconfig.single_inv_detail.timeout,
            time: true
        };
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

})(module.exports);
