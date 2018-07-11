/**
 * Created by yuvaraj on 25/06/18.
 */
(function (orderQueryBuilder) {
    "use strict";
    
    var path = require('path');
    var model = require(path.resolve('./model/OrderQueryModel', '')),
        utils = require(path.resolve('./lib/utils/common/common-utils')),
        constants = require(path.resolve('./lib/constants/constants.js',''));
    
    orderQueryBuilder.buildQueryParams = function (req) {
        var queryModel = new model();
        queryModel.entityId = req.query.entity_id;
        queryModel.status = req.query.order_status;
        queryModel.otype = req.query.order_type;
        queryModel.offset = utils.checkNotNullEmpty(req.query.offset)?req.query.offset:constants.const.OFFSET;
        queryModel.size = utils.checkNotNullEmpty(req.query.size)?req.query.size:constants.const.SIZE;
        queryModel.linkedKioskId = req.query.related_entity_id;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.ip = req.headers['x-real-ip'];
        queryModel.from = req.query.from_date;
        queryModel.until = req.query.to_date;
        return queryModel;
    };

})(module.exports);