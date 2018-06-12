/**
 * Created by smriti on 29/05/17.
 */

var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    path = require('path'),
    config = require(path.resolve('./conf', ''));

describe('userTests', function () {
    var request, route;
    beforeEach(function () {
        "use strict";
        request = sinon.stub();
        route = proxyquire('../../lib/restclient/restclient.js', {'request': request});
    });
    it('shud give 200', function (done) {
        var req = {
            url: "http://localhost:8080/s2/api/dashboard/assets",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "smriti",
                'x-request-id': undefined
            },
            qs:  {
                filter: undefined,
                level: undefined,
                aType: undefined,
                size: undefined,
                offset: undefined,
                excludeETag: undefined,
                refresh: undefined,
                onlyTempData: undefined,
                tPeriod: undefined,
                includeETag: undefined
            },
            timedOut: 30000,
            time: true
        };
        console.log("req: " + JSON.stringify(req));
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
        request.withArgs(req).yields(null, res, body);
        //res.statusCode = 201;
        request.withArgs(options).yields(null, res, body);
        route.callApi(options, function (err, data) {
            console.log("Process end:");
            expect(err).to.be.null;
            expect(data).to.be.equals(body);
            done();
        });
    });
});
