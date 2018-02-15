/**
 * Created by yuvaraj on 14/02/18.
 */

(function (reportService) {

    "use strict";

    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));


    reportService.getReport = function (q, callback) {
        var options = constructRequest(q);
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

    function constructRequest(req) {
        var reqUrl = "?json=" + constructJSON(req);
        return {
            url: config.baseurl + config.dashconfig.report.url + reqUrl,
            method: config.dashconfig.report.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': req.headers['x-access-user'],
                'x-request-id': req.headers['x-request-id']
            },
            timedOut: config.dashconfig.report.timeout,
            time: true
        };
    };

    function constructJSON(req) {
        var object = {
            "periodicity": req.query.periodicity, "entity": req.query.entity_name, "etag": req.query.entity_tag,
            "mat": req.query.mat_name, "mtag": req.query.mat_tag, "type": req.query.trend_type,
            "duration": req.query.duration, "from": req.query.from, "to": req.query.to,
            "abnormalityType": req.query.abnormalityType, "availableTime": req.query.availableTime, "compare": req.query.compare?req.query.compare:"none"
        };
        return encodeURI(JSON.stringify(object));
    };


})(module.exports);