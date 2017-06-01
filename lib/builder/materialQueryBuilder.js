/**
 * Created by yuvaraj on 26/05/17.
 */
(function(materialQueryBuilder) {
    "use strict";
    var model = require('../../model/MaterialSearchModel');

    materialQueryBuilder.buildMaterialSearchParams = function(req) {
        var queryModel = new model();
        queryModel.tags = req.query.tags;
        queryModel.q = req.query.q;
        queryModel.offset = req.query.offset;
        queryModel.size = req.query.size;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    }
}) (module.exports);