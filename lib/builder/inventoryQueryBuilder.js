/**
 * Created by yuvaraj on 26/05/17.
 */
(function (inventoryQueryBuilder) {
    "use strict";

    var path = require('path');
    var model = require(path.resolve('./model/InvDetailQueryModel', '')),
        utils = require(path.resolve('./lib/utils/common/common-utils'));

    inventoryQueryBuilder.buildInvParams = function (req) {
        var queryModel = new model();
        queryModel.eid = req.query.entity_id;
        queryModel.mid = req.query.material_id;
        queryModel.mtags = req.query.mtags;
        queryModel.etags = req.query.etags;
        queryModel.abType = req.query.abty;
        queryModel.offset = req.query.of;
        queryModel.size = req.query.sz;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        var loc = {};
        if (utils.checkNotNullEmpty(req.query.state)) {
            loc.state = req.query.state;
        }
        if (utils.checkNotNullEmpty(req.query.district)) {
            loc.district = req.query.district;
        }
        if (utils.checkNotNullEmpty(req.query.taluk)) {
            loc.taluk = req.query.taluk;
        }
        if (!utils.checkNullEmptyObject(loc)) {
            queryModel.loc = JSON.stringify(loc);
        }
        return queryModel;
    };

    inventoryQueryBuilder.buildInvDetailParams = function (req) {
        var queryModel = new model();
        queryModel.eid = req.query.entity_id;
        queryModel.mid = req.query.material_id;
        queryModel.offset = req.query.of;
        queryModel.size = req.query.sz;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        return queryModel;
    };
})(module.exports);