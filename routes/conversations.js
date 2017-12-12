/**
 * Created by yuvaraj on 22/06/17.
 */

'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    convQueryBuilder = require(path.resolve('./lib/builder/conversationQueryBuilder','')),
    conversationService = require(path.resolve('./lib/restclient/conversation/conversation','')),
    constants = require(path.resolve('./lib/constants/constants', '')),
    commonUtils = require(path.resolve('./lib/utils/common/common-utils',''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.put('/conversations', function (req) {

    return new Promise(function(resolve, reject) {
        try {
            validateRequestParams(req.body, req.method);
        } catch(exception){
            logger.warn(exception.message);
            reject(exception);
            return;
        }
        var tempReq = {};
        var model = convQueryBuilder.addMessageParam(req);
        if (req.body.conversation_id) {
            tempReq.conversationId = req.body.conversation_id;
            tempReq.userId = req.body.user_id;
            if(req.body.content.type=="text") {
                tempReq.message = req.body.content.data;
            }
            req.body = tempReq;
            conversationService.addMessage(model, req, function (err, data) {
                if (err) {
                    logger.error('Error in adding message ' + err.message);
                    reject(err);
                } else {
                    var resData = {};
                    data = JSON.parse(data);
                    resData.message_id = data.messageId;
                    resData.conversation_id = data.conversationId;
                    resolve(resData);
                }
            });
        } else {
            if(req.body.content.type=="text") {
                tempReq.data = req.body.content.data;
            }
            req.body = tempReq;
            conversationService.addEditMessage(model, req, function (err, data) {
                if (err) {
                    logger.error('Error in adding message ' + err.message);
                    reject(err);
                } else {
                    var resData = {};
                    data = JSON.parse(data);
                    resData.message_id = data.messageId;
                    resData.conversation_id = data.conversationId;
                    resolve(resData);
                }
            });
        }
    });
});

router.get('/conversations', function (req) {

    return new Promise(function (resolve, reject) {
        try {
            validateRequestParams(req.query, req.method);
        } catch(exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        var model = convQueryBuilder.getMessageParam(req);
        conversationService.getMessages(model, req, function (err, data) {
            if (err) {
                logger.error('Error in adding message ' + err.message);
                reject(err);
            } else {
                var conversation = {};
                data = JSON.parse(data);
                conversation.data = [];
                conversation.total = data.numFound;
                conversation.size = data.size;
                conversation.offset = data.offset;
                data.results.forEach(function(data){
                    var dt ={};
                    dt.message_id = data.messageId;
                    dt.user_id = data.userId;
                    dt.unm = data.userName;
                    dt.content = {};
                    dt.content.type = "text";
                    dt.content.data = data.message;
                    dt.created_on = new Date(data.cts).toISOString();
                    conversation.data.push(dt);
                });
                resolve(conversation);
            }
        });
    });
});

function validateRequestParams(obj, method){
    if(commonUtils.checkNullEmpty(obj.conversation_id)){
        if(commonUtils.checkNullEmpty(obj.object_type) || commonUtils.checkNullEmpty(obj.object_id))
            commonUtils.generateValidationError("One of object type or object id is required.");
    }
    if(constants.const.PUT == method) {
        if (!commonUtils.checkIsObject(obj)) {
            commonUtils.generateValidationError("Invalid request payload");
        }
        if (commonUtils.checkNullEmpty(obj.user_id)) {
            commonUtils.generateValidationError("User id is required");
        }
        if (commonUtils.checkNullEmpty(obj.content.data)) {
            commonUtils.generateValidationError("message data is required");
        }
        if (commonUtils.checkNullEmpty(obj.content.type)) {
            commonUtils.generateValidationError("message type is required");
        }
    }
}

module.exports = router.getRouter();