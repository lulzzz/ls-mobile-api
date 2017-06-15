/**
 * Created by yuvaraj on 26/05/17.
 */
(function (inventoryQueryBuilder) {
    "use strict";
    var path = require('path'),
        model = require(path.resolve('./model/InvDetailQueryModel',''));

    inventoryQueryBuilder.buildInvParams = function (req) {
        var queryModel = new model();
        queryModel.eid = req.query.entity_id;
        queryModel.mid = req.query.material_id;
        queryModel.mtags = req.query.mtags;
        queryModel.etags = req.query.etags;
        queryModel.abty = req.query.abty;
        queryModel.offset = req.query.of;
        queryModel.size = req.query.sz;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.ip = req.header('x-real-ip');
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
        queryModel.ip = req.header('x-real-ip');
        return queryModel;
    };
})(module.exports);