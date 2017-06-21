/**
 * Created by yuvaraj on 14/06/17.
 */
(function (conversationQueryBuilder) {
    "use strict";

    var path = require('path'),
        model = require(path.resolve('./model/conversationQueryModel',''));

    conversationQueryBuilder.addMessageParam = function (req) {
        if(!req.query.type){
            req.query.type = "APPROVAL";
        }
        var queryModel = new model();
        queryModel.objectId = req.query.type_id || req.params.approval_id;
        queryModel.objectType = req.query.type;
        queryModel.conversationId = req.query.conversation_id;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        return queryModel;
    };
    conversationQueryBuilder.getMessageParam = function (req) {
        if(!req.query.type){
            req.query.type = "APPROVAL";
        }
        var queryModel = new model();
        queryModel.objectId = req.query.type_id;
        queryModel.objectType = req.query.type;
        queryModel.conversationId = req.query.conversation_id;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        return queryModel;
    };

})(module.exports);