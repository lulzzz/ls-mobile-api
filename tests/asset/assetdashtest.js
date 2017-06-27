/**
 * Created by smriti on 29/05/17.
 */

var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe('userTests', function () {
    var request, route, route1, p;
    beforeEach(function () {
        "use strict";
        request = sinon.stub();
        route = proxyquire('../lib/restclient/restclient.js', {'request': request});
        route1 = proxyquire('../lib/restclient/dashboard/dashboardService.js', {'request': request});
    });
    it('shud give 200', function (done) {
        var req = {
            url: "http://localhost:8080/s2/api/dashboard/",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "smriti"
            },
            qs: {},
            timedOut: 1000
        };
        var options ={};
        options.user = "smriti";
        var body = JSON.stringify({
            "tn": 1,
            "tl": 0,
            "th": 0,
            "tu": 3,
            "tc": 4,
            "restime": null,
            "l": "country"
        });
        var res = {};
        res.statusCode = 200;
        console.log("\n req: " + JSON.stringify(req));
        request.withArgs(req).yields(null, res, body);
        res.statusCode = 201;
        request.withArgs(options).yields(null, res, body);
        route1.getAssetDashboard(options, function (err, data) {
            console.log("Process end:");
            expect(err).to.be.null;
            expect(data).to.be.equals(body);
            done();
        });
        route.callApi(req, function(err, data) {
            console.log("call API: ");
            console.log("Data: " + data);
            expect(err).to.be.null;

        });
    });
});
