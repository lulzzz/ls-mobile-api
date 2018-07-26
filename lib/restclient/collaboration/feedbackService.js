(function (feedbackService) {
    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));

    feedbackService.submitFeedback = function (req, callback) {
        var options = {
            url: config.baseurl + config.collaborationConfig.post_feedback.url,
            method: config.collaborationConfig.post_feedback.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-request-id': req.headers['x-request-id'],
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user'],
                'x-app-name': req.headers['x-app-name'],
                'x-app-ver': req.headers['x-app-ver']
            },
            body: req.body,
            json:true,
            timeout: config.collaborationConfig.post_feedback.timeout
        };
        restClient.callApi(options, callback);
    };
})
(module.exports);