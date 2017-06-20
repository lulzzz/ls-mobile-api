/**
 * Created by yuvaraj on 14/06/17.
 */
(function (conversationQueryBuilder) {
    "use strict";

    var path = require('path'),
        model = require(path.resolve('./model/conversationQueryModel',''));

    conversationQueryBuilder.addMessageParam = function (req) {
        if(!req.query.objectType){
            req.query.objectType = "APPROVAL";
        }
        var queryModel = new model();
        queryModel.objectId = req.query.objectId;
        queryModel.objectType = req.query.objectType;
        queryModel.conversationId = req.query.conversationId;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    };
    conversationQueryBuilder.getMessageParam = function (req) {
        if(!req.query.objectType){
            req.query.objectType = "APPROVAL";
        }
        var queryModel = new model();
        queryModel.objectId = req.query.objectId;
        queryModel.objectType = req.query.objectType;
        queryModel.conversationId = req.query.conversationId;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    };

})(module.exports);