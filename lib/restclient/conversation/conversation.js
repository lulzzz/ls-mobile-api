/**
 * Created by yuvaraj on 14/06/17.
 */
(function (conversation) {

    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    conversation.addMessage = function (q, req, callback) {
        var options = {
            url: config.baseurl + config.conversationConfig.addmessage.url,
            method: config.conversationConfig.addmessage.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId,
                'x-real-ip': q.xforward
            },
            body: JSON.stringify(req.body),
            timedOut: config.conversationConfig.addmessage.timeout
        };
        //here call to logistimo api for adding a message
        restClient.callApi(options, callback);
    };

    conversation.addEditMessage = function (q, req, callback) {
        var options = {
            url: config.baseurl + config.conversationConfig.addmessage.url + '/' + q.objectType + '/' + q.objectId,
            method: config.conversationConfig.addmessage.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId,
                'x-real-ip': q.xforward
            },
            body: JSON.stringify(req.body),
            timedOut: config.conversationConfig.addmessage.timeout
        };
        //here call to logistimo api for adding a new conversation
        restClient.callApi(options, callback);
    };

    conversation.getMessages = function (q, req,callback) {
        var options = {
            url: config.baseurl + config.conversationConfig.getmessages.url,
            method: config.conversationConfig.getmessages.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId,
                'x-real-ip': q.xforward
            },
            qs: {
                objId:q.objectId,
                objType:q.objectType,
                user:q.user,
                reqId:q.reqId,
                conversationId:q.conversation_id,
                size:q.size,
                offset:q.offset,
                cnt:q.cnt
            },
            timedOut: config.conversationConfig.getmessages.timeout,
            time : true
        };
        //here call to logistimo api for adding a new conversation
        restClient.callApi(options, callback);
    };

})(module.exports);
