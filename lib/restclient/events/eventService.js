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
            timeout: config.eventsConfig.events.timeout
        };
        restClient.callApi(options, callback);
    };

    eventService.getEventsByType = function (req, callback) {
        var options = {
            url: config.eventsUrl + config.eventsConfig.eventsByType.url + req.query.event_id,
            method: config.eventsConfig.eventsByType.method,
            header: {
                'Content-Type': 'application/json',
                'Application-Type': 'application/json',
                'x-access-user': req.header('x-access-user'),
                'x-real-ip': req.header("x-real-ip")
            },
            qs: {
                event_type: req.params.event_type,
                domain_id: req.params.domain_id
            },
            timeout: config.eventsConfig.eventsByType.timeout
        };
        restClient.callApi(options, callback);
    };
})
(module.exports);