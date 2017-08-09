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
                'x-access-user': req.header('x-access-user'),
                'x-real-ip': req.header("x-real-ip")
            },
            qs: {
                cn_domain_id: req.query.cn_domain_id,
                user_id: req.query.user_id
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
                'x-access-user': req.header('x-access-user'),
                'x-real-ip': req.header("x-real-ip")
            },
            qs: {
                event_type: req.query.event_type,
                domain_id: req.query.domain_id,
                cn_domain_id: req.query.cn_domain_id,
                user_id: req.query.user_id
            },
            timeout: config.eventsConfig.eventsByType.timeout
        };
        restClient.callApi(options, callback);
    };
})
(module.exports);