/**
 * Created by yuvaraj on 25/06/18.
 */
(function (orderQueryBuilder) {
    "use strict";
    
    var path = require('path');
    var model = require(path.resolve('./model/InvDetailQueryModel', '')),
        utils = require(path.resolve('./lib/utils/common/common-utils'));
    
    orderQueryBuilder.buildQueryParams = function (req) {
        var queryModel = new model();
        queryModel.kid = req.query.entity_id;
        queryModel.st = req.query.order_status;
        queryModel.oty = req.query.order_type;
        queryModel.o = req.query.offset;
        queryModel.s = req.query.size;
        queryModel.rkid = req.query.related_entity_id;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        return queryModel;
    };

})(module.exports);