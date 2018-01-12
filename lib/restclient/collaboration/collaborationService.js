/**
 * Created by smriti on 19/11/17.
 */


(function (collaborationService) {
    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    collaborationService.postLike = function (req, callback) {
        var options = {
            url: config.baseurl + config.collaborationConfig.post_like.url,
            method: config.collaborationConfig.post_like.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            body: req.body,
            json:true,
            timeout: config.collaborationConfig.post_like.timeout
        };
        restClient.callApi(options, callback);
    };

    collaborationService.getLikersDetail = function (req, callback) {
        var options = {
            url: config.baseurl + config.collaborationConfig.get_likers_detail.url + "/" + req.query.object_type + "/" + req.query.object_id + "/" + req.params.event_id + "/likers",
            method: config.collaborationConfig.get_likers_detail.method,
            headers: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            qs: {
                offset: req.query.offset,
                size: req.query.size
            },
            timeout: config.collaborationConfig.get_likers_detail.timeout
        };
        restClient.callApi(options, callback);
    };

    collaborationService.getLikesCount = function(req, data, callback) {
        var options = {
            url: config.collaborationServiceUrl + config.collaborationConfig.get_likes_count.url,
            method: config.collaborationConfig.get_likes_count.method,
            headers: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-app-name': 'logistimo',
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            body: data,
            timeout: config.collaborationConfig.get_likes_count.timeout,
            json:true
        };
        restClient.callApi(options, callback);
    };

    collaborationService.getLikesOnEvent = function(req, callback) {
        var options = {
            url: config.baseurl + config.collaborationConfig.get_likes.url,
            method: config.collaborationConfig.get_likes.method,
            headers: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            qs: {
                object_type: req.params.object_type,
                object_id: req.params.object_id,
                context_id: req.query.context_id,
                count: req.query.count,
                lang: req.query.lang,
                offset: req.query.offset,
                size: req.query.size
            },
            timeout: config.collaborationConfig.get_likes.timeout
        };
        restClient.callApi(options, callback);
    }
})
(module.exports);