/**
 * Created by smriti on 23/05/17.
 */


(function (queryBuilder) {
    "use strict";

    var path = require('path'),
        model = require(path.resolve('./model/approvalQueryModel',''));

    queryBuilder.getQueryParams = function (req) {
        model.approver_id = req.query.aid;
        model.requester_id = req.query.rid;
        model.approver_status = req.query.ast;
        model.status = req.query.st;
        model.offset = req.query.of;
        model.size = req.query.sz;
        model.ordered_by = req.query.ob;
        model.expiring_in = req.query.ex;
        model.type = req.query.ty;
        model.type_id = req.query.tid;
        model.attribute_key = req.query.akey;
        model.attribute_value = req.query.aval;
        return model;
    }
})
(module.exports);