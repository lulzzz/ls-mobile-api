/**
 * Created by yuvaraj on 22/06/17.
 */

'use strict';

var router = require('express').Router(),
    path = require('path'),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    logger = require(path.resolve('./lib/utils/log', '')),
    convQueryBuilder = require(path.resolve('./lib/builder/conversationQueryBuilder','')),
    conversationService = require(path.resolve('./lib/restclient/conversation/conversation','')),
    commonUtils = require(path.resolve('./lib/utils/common/common-utils',''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.put('/conversations', function (req, res, next) {
    try{
        validate(req.body);
    }catch(e){
        res.status(400).send(e.message);
        return;
    }
    var model = convQueryBuilder.addMessageParam(req);
    if (req.body.conversation_id) {
        var tempReq = {};
        tempReq.conversationId = req.body.conversation_id;
        tempReq.userId = req.body.user_id;
        if(req.body.content.type=="text") {
            tempReq.message = req.body.content.data;
        }
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
        if(req.body.content.type=="text") {
            tempReq.message = req.body.content.data;
        }
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

function validate(obj){
    if(!commonUtils.checkIsObject(obj)){
        throw new TypeError("Request is invalid");
    }
    if(!commonUtils.checkNotNullEmpty(obj.conversation_id)){
        if(!commonUtils.checkNotNullEmpty(obj.object_type) || !commonUtils.checkNotNullEmpty(obj.object_id))
            throw new TypeError("Request is invalid");
    }
    if(!commonUtils.checkNotNullEmpty(obj.user_id)){
        throw new TypeError("Request is invalid");
    }
    if(!commonUtils.checkNotNullEmpty(obj.content.data)){
        throw new TypeError("Request is invalid");
    }
    if(!commonUtils.checkNotNullEmpty(obj.content.type)){
        throw new TypeError("Request is invalid");
    }
}


module.exports = router;