/**
 * Created by yuvaraj on 14/06/17.
 */
'use strict';

var router = require('express').Router(),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log','')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    queryBuilder = require(path.resolve('./lib/builder/conversationQueryBuilder','')),
    conversationConfig = require(path.resolve('./lib/restclient/conversation/conversation',''));

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.post('/addmessage', function (req, res, next) {
    var model = queryBuilder.addMessageParam(req);
    if (req.query.convId) {
        conversationConfig.addMessage(model, req, res, function (err, data) {
            if (err) {
                logger.error('Error in adding message ' + err.message);
                next(err);
            } else if (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).send(data);
            }
        });
    }else{
        conversationConfig.addEditMessage(model, req, res, function (err, data) {
            if (err) {
                logger.error('Error in adding message ' + err.message);
                next(err);
            } else if (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).send(data);
            }
        });
    }
});

module.exports = router;