/**
 * Created by yuvaraj on 14/06/17.
 */
(function (conversation) {

    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    conversation.addMessage = function (q, req, res, callback) {
        var options = {
            url: config.baseurl + config.conversationConfig.addmessage.url,
            method: config.conversationConfig.addmessage.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            body: JSON.stringify(req.body),
            timedOut: config.conversationConfig.addmessage.timeout
        };
        //here call to logistimo api for adding a message
        restClient.callApi(options, callback);
    };

    conversation.addEditMessage = function (q, req, res, callback) {
        var options = {
            url: config.baseurl + config.conversationConfig.addmessage.url + '/' + q.objectType + '/' + q.objectId,
            method: config.addeditmessage.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            body: JSON.stringify(req.body),
            timedOut: config.addeditmessage.timeout
        };
        //here call to logistimo api for adding a new conversation
        restClient.callApi(options, callback);
    };

})(module.exports);
