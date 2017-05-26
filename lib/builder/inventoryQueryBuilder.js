/**
 * Created by yuvaraj on 26/05/17.
 */
(function (inventoryQueryBuilder) {
    "use strict";
    var model = require('../../model/InvDetailQueryModel');

    inventoryQueryBuilder.buildInvParams = function (req) {
        var queryModel = new model();
        queryModel.eid = req.query.entity_id;
        queryModel.mid = req.query.material_id;
        queryModel.mtags = req.query.mtags;
        queryModel.etags = req.query.etags;
        queryModel.abty = req.query.abty;
        queryModel.offset = req.query.offset;
        queryModel.size = req.query.size;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    }

    inventoryQueryBuilder.buildInvDetailParams = function (req) {
        var queryModel = new model();
        queryModel.eid = req.query.entity_id;
        queryModel.mid = req.query.material_id;
        queryModel.offset = req.query.offset;
        queryModel.size = req.query.size;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    }
})(module.exports);