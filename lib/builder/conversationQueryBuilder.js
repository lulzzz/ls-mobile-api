/**
 * Created by yuvaraj on 14/06/17.
 */
(function (conversationQueryBuilder) {
    "use strict";

    var path = require('path'),
        model = require(path.resolve('./model/conversationQueryModel',''));

    conversationQueryBuilder.addMessageParam = function (req) {
        var queryModel = new model();
        queryModel.objectId = req.query.objectId;
        queryModel.objectType = req.query.objectType;
        queryModel.convId = req.query.convId;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    };

})(module.exports);