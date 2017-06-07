/**
 * Created by smriti on 23/05/17.
 */


(function (queryBuilder) {
    "use strict";

    var model = require('../../model/approvalQueryModel');

    queryBuilder.getQueryParams = function (req) {
        model.approver_id = req.query.id;
       // model.approver_status = req.query.st;
        model.offset = req.query.of;
        model.size = req.query.sz;
        model.ordered_by = req.query.ob;
        model.type = req.query.ty;
        model.expiring_in = req.query.ex;
        return model;
    }
})
(module.exports);