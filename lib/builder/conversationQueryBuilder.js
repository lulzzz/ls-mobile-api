/**
 * Created by yuvaraj on 14/06/17.
 */
(function (conversationQueryBuilder) {
    "use strict";

    var path = require('path'),
        model = require(path.resolve('./model/conversationQueryModel',''));

    conversationQueryBuilder.addMessageParam = function (req) {
        if(!req.query.object_type){
            req.query.object_type = "APPROVAL";
        }
        var queryModel = new model();
        queryModel.objectId = req.body.object_id;
        queryModel.objectType = req.body.object_type;
        queryModel.conversationId = req.body.conversation_id;
        queryModel.message = req.body.content.data;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        return queryModel;
    };
    conversationQueryBuilder.getMessageParam = function (req) {
        if(!req.query.object_type){
            req.query.object_type = "APPROVAL";
        }
        var queryModel = new model();
        queryModel.objectId = req.query.object_id;
        queryModel.objectType = req.query.object_type;
        queryModel.conversationId = req.query.conversation_id;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.xforward = req.headers['x-real-ip'];
        return queryModel;
    };

})(module.exports);