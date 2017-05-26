/**
 * Created by yuvaraj on 26/05/17.
 */
(function(entityQueryBuilder) {
    "use strict";
    var model = require('../../model/EntitySearchModel');

    entityQueryBuilder.buildEntitySearchParams = function(req) {
        var queryModel = new model();
        queryModel.dId = req.query.dId;
        queryModel.eid = req.query.entity_id;
        queryModel.tags = req.query.tags;
        queryModel.q = req.query.q;
        queryModel.offset = req.query.offset;
        queryModel.size = req.query.size;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    }
}) (module.exports);