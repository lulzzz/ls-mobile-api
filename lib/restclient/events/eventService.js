/**
 * Created by smriti on 31/07/17.
 */

(function (eventService) {

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        constants = require(path.resolve('./lib/constants/constants', ''));
        restClient = require(path.resolve('./lib/restclient/restclient', ''));


    eventService.getEventSummaries = function (req, callback) {
        var options = {
            url: config.eventsUrl + config.eventsConfig.events.url,
            method: config.eventsConfig.events.method,
            header: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-app-name': constants.const.LOGI_APP,
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers["x-real-ip"]
            },
            qs: {
                cn_domain_id: req.query.cn_domain_id,
                user_id: req.query.user_id,
                lang: req.query.lang ? req.query.lang : constants.const.DEFAULT_LANGUAGE,
                event_id: req.query.event_id,
                include_distribution: req.query.include_distribution ||  false
            },
            timeout: config.eventsConfig.events.timeout
        };
        restClient.callApi(options, callback);
    };

    eventService.getEventsByType = function (req, callback) {
        var options = {
            url: config.eventsUrl + config.eventsConfig.eventsByType.url + req.params.event_id,
            method: config.eventsConfig.eventsByType.method,
            header: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-app-name': constants.const.LOGI_APP,
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers["x-real-ip"]
            },
            qs: {
                domain_id: req.query.domain_id,
                cn_domain_id: req.query.cn_domain_id,
                user_id: req.query.user_id,
                lang: req.query.lang ? req.query.lang : constants.const.DEFAULT_LANGUAGE,
                offset: req.query.offset,
                size:req.query.size
            },
            timeout: config.eventsConfig.eventsByType.timeout
        };
        restClient.callApi(options, callback);
    };

    eventService.getEventsByObjectType = function (req, callback) {
        var options = {
            url: config.eventsUrl + "/"+ req.params.event_id + "/"+req.params.object_type + "/"+ req.params.object_id,
            method: config.eventsConfig.eventsByType.method,
            header: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-app-name': constants.const.LOGI_APP,
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers["x-real-ip"]
            },
            qs: {
                domain_id: req.query.domain_id,
                cn_domain_id: req.query.cn_domain_id,
                user_id: req.query.user_id,
                lang: req.query.lang ? req.query.lang : constants.const.DEFAULT_LANGUAGE,
                offset: req.query.offset,
                size:req.query.size
            },
            timeout: config.eventsConfig.eventsByType.timeout
        };
        restClient.callApi(options, callback);
    };
})
(module.exports);