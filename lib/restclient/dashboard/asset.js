/**
 * Created by smriti on 5/2/17.
 */
(function(assetService) {
    "use strict";
    const request = require('request');
    assetService.getAssetsForDomain = function(q, req, res, callback) {
        debugger
        var options = {
            url: 'http://localhost:8080/s2/api/assets/alerts/recent/' + q.vId + '/' + q.dId,
            method: 'GET',
            headers: {
                'Accept-Charset' : 'utf-8',
                'Content-Type' : 'application/json',
                'x-access-token': q.token
            },
            qs: {
                page: q.page,
                size: q.size
            },
            timedOut: 1000
        };
        var status;
        request(options, function (err, response, body) {
            status = response.statusCode;
            if (err) {
                callback(new Error(err.message),null);
            }

            if (status != null && status == 200 || status == 201 && body == true) {
                callback(null,body);
            }
            else {
                callback(new Error("Unauthorised user"),null);;
            }
        });
    }
})
(module.exports)