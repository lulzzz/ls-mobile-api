/**
 * Created by smriti on 31/05/17.
 */


var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe('test', function () {
    var request, route;
    beforeEach(function () {
        "use strict";
        request = sinon.stub();
        //route = proxyquire('../lib/restclient/dashboard/dashboardService.js', {'request': request});
        route = proxyquire('../lib/restclient/restclient.js', {'request': request});
    });
    it('shud give 200', function (done) {
        this.timeout(1000);
        console.log("inside func");
        var expectedEndpoint = 'http://localhost:8080/s2/api/dashboard/';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/dashboard/",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "smriti"
            }
        };

        var body = JSON.stringify({
            "tn": 1,
            "tl": 0,
            "th": 0,
            "tu": 3,
            "tc": 4,
            "restime": null,
            "l": "country"
        });
        request.withArgs(expectedEndpoint).yields(null, null, body);
        request.withArgs(req).yields(null, null, body);

        console.log(req);
        route.callApi(req, function (err, data) {
            console.log("callApi");
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            console.log("\n data: " + data);
            done();
        });
    });
});
