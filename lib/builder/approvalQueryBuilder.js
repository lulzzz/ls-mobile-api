/**
 * Created by smriti on 23/05/17.
 */


(function(queryBuilder) {
    "use strict";

    var model = require('../../model/approvalQueryModel');

    queryBuilder.getQueryParams = function(req) {
        model.approver_id = req.query.id;
        model.approver_status = req.query.st;
        model.offset = req.query.o;
        model.size = req.query.sz;
        model.ordered_by = req.query.ob;
        model.type = req.query.ty;
        return model;
    }
})
(module.exports);