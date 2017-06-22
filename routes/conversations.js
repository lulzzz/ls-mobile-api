/**
 * Created by yuvaraj on 22/06/17.
 */

'use strict';

var router = require('express').Router(),
    path = require('path'),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
    convQueryBuilder = require(path.resolve('./lib/builder/conversationQueryBuilder','')),
    conversationService = require(path.resolve('./lib/restclient/conversation/conversation',''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.put('/conversations', function (req, res, next) {
    var model = convQueryBuilder.addMessageParam(req);
    if (req.body.conversation_id) {
        var tempReq = {};
        tempReq.conversationId = req.body.conversation_id;
        tempReq.userId = req.body.user_id;
        tempReq.message = req.body.content.data;
        req.body = tempReq;
        conversationService.addMessage(model, req, function (err, data) {
            if (err) {
                logger.error('Error in adding message ' + err.message);
                next(err);
            } else if (data) {
                var resData = {};
                data = JSON.parse(data);
                resData.message_id = data.messageId;
                resData.conversation_id = data.conversationId;
                res.append('Content-Type', 'application/json');
                res.status(200).send(resData);
            }
        });
    }else{
        var tempReq = {};
        tempReq.data= req.body.message;
        req.body = tempReq;
        conversationService.addEditMessage(model, req, function (err, data) {
            if (err) {
                logger.error('Error in adding message ' + err.message);
                next(err);
            } else if (data) {
                var resData = {};
                data = JSON.parse(data);
                resData.message_id = data.messageId;
                resData.conversation_id = data.conversationId;
                res.append('Content-Type', 'application/json');
                res.status(200).send(resData);
            }
        });
    }
});

router.get('/conversations', function (req, res, next) {
    var model = convQueryBuilder.getMessageParam(req);
    conversationService.getMessages(model, req, function (err, data) {
        if (err) {
            logger.error('Error in adding message ' + err.message);
            next(err);
        } else if (data) {
            var tempData = {};
            data = JSON.parse(data);
            tempData.data = [];
            tempData.total = data.numFound;
            tempData.size = data.size;
            tempData.offset = data.offset;
            data.results.forEach(function(data){
                var dt ={}
                dt.message_id = data.messageId;
                dt.user_id = data.userId;
                dt.content = {};
                dt.content.type = "text";
                dt.content.data = data.message;
                dt.created_on = new Date(data.cts).toISOString();
                tempData.data.push(dt);
            });
            res.append('Content-Type', 'application/json');
            res.status(200).send(tempData);
        }
    });
});

module.exports = router;