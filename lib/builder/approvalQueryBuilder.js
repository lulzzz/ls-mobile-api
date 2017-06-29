/**
 * Created by smriti on 23/05/17.
 */


(function (queryBuilder) {
    "use strict";

    var model = require('../../model/approvalQueryModel');

    queryBuilder.getQueryParams = function (req) {
        model.approver_id = req.query.approver_id;
        model.requester_id = req.query.requester_id;
        model.status = req.query.status;
        model.offset = req.query.offset;
        model.size = req.query.size;
        model.expiring_in = req.query.expiring_in;
        model.type = req.query.type;
        model.order_id = req.query.order_id;
        model.entity_id = req.query.entity_id;
        model.xforward = req.headers['x-real-ip'],
        model.user = req.headers['x-access-user']
        if (typeof req.query.embed !== 'undefined' && req.query.embed != null && req.query.embed !== "") {
            model.embed = req.query.embed;

        }
        return model;
    }
})
(module.exports);
