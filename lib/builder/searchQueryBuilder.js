/**
 * Created by yuvaraj on 26/05/17.
 */
(function (searchQueryBuilder) {
    "use strict";
    var model = require('../../model/SearchModel');

    searchQueryBuilder.buildSearchParams = function (req) {
        var queryModel = new model();
        queryModel.tags = req.query.tags;
        queryModel.q = req.query.q;
        queryModel.offset = req.query.of;
        queryModel.size = req.query.sz;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        queryModel.eid = req.query.entity_id;
        return queryModel;
    }
})(module.exports);