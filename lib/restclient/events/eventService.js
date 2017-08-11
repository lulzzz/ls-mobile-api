/**
 * Created by smriti on 31/07/17.
 */

(function (eventService) {

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));


    eventService.getEventSummaries = function (req, callback) {
        var options = {
            url: config.eventsUrl + config.eventsConfig.events.url,
            method: config.eventsConfig.events.method,
            header: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-app-name': 'logistimo',
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers["x-real-ip"]
            },
            qs: {
                cn_domain_id: req.query.cn_domain_id,
                user_id: req.query.user_id,
                lang: req.headers["x-locale"] ? req.headers["x-locale"] : "en"
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
                'x-app-name': 'logistimo',
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers["x-real-ip"]
            },
            qs: {
                domain_id: req.query.domain_id,
                cn_domain_id: req.query.cn_domain_id,
                user_id: req.query.user_id,
                lang: req.headers["x-locale"] ? req.headers["x-locale"] : "en"
            },
            timeout: config.eventsConfig.eventsByType.timeout
        };
        restClient.callApi(options, callback);
    };
})
(module.exports);