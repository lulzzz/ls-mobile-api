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
    it('with conversation id', function (done) {
        this.timeout(1000);
        var expectedEndpoint = 'http://localhost:8080/s2/api/conversation/message';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/conversation/message",
            method: "POST",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            },
            body:{"conversationId":"4bb1b27d-2b4d-4aa8-9dbf-a559ec5da3f5","message":"wdefrg","userId":"yuvaraj","userName":"yuva"}
        };

        var body = JSON.stringify({"conversationId":"4bb1b27d-2b4d-4aa8-9dbf-a559ec5da3f5","message":"wdefrg","userId":"yuvaraj","userName":"yuva"});
        var res = {}
        res.statusCode = 200;
        request.withArgs(expectedEndpoint).yields(null, null, body);
        request.withArgs(req).yields(null, res, body);

        route.callApi(req, function (err, data) {
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            done();
        });
    });
    it('without conversation id', function (done) {
        this.timeout(1000);
        var expectedEndpoint = 'http://localhost:8080/s2/api/conversation/message/APPROVAL/345321';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/conversation/message/APPROVAL/345321",
            method: "POST",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            },
            body:{"message":"wdefrg","userId":"yuvaraj","userName":"yuva"}
        };

        var body = JSON.stringify({"conversationId":"4bb1b27d-2b4d-4aa8-9dbf-a559ec5da3f5","messageId":"4bb1b27d-2b4d-4aa8-9dbf-a559ec5daer4","userId":"yuvaraj","userName":"yuva"});
        var res = {}
        res.statusCode = 200;
        request.withArgs(expectedEndpoint).yields(null, null, body);
        request.withArgs(req).yields(null, res, body);

        route.callApi(req, function (err, data) {
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            done();
        });
    });
    it('create user device', function (done) {
        this.timeout(1000);
        var expectedEndpoint = 'http://localhost:8080/s2/api/userdevice/';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/conversation/userdevice/",
            method: "POST",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            },
            body:{"userid":"456723", "token": "First_Entry", "appname":"MA"}
        };

        var body = "User device profile for id: <b>456723</b> created successfully";
        var res = {}
        res.statusCode = 200;
        request.withArgs(expectedEndpoint).yields(null, null, body);
        request.withArgs(req).yields(null, res, body);

        route.callApi(req, function (err, data) {
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            done();
        });
    });
    it('update user device', function (done) {
        this.timeout(1000);
        var expectedEndpoint = 'http://localhost:8080/s2/api/userdevice/';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/conversation/userdevice/",
            method: "POST",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            },
            body:{"userid":"456723", "token": "First_Entry", "appname":"MA1"}
        };

        var body = "User device profile for id: <b>456723</b> updated successfully";
        var res = {}
        res.statusCode = 200;
        request.withArgs(expectedEndpoint).yields(null, null, body);
        request.withArgs(req).yields(null, res, body);

        route.callApi(req, function (err, data) {
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            done();
        });
    });
    it('get device token', function (done) {
        this.timeout(1000);
        var expectedEndpoint = 'http://localhost:3000/userdevice/gettoken?userid=10000001&appname=MA';
        //var req= {};
        var req = {
            url: "http://localhost:3000/userdevice/gettoken?userid=10000001&appname=MA",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            }
        };

        var body = "qwerty12345";
        var res = {}
        res.statusCode = 200;
        request.withArgs(expectedEndpoint).yields(null, null, body);
        request.withArgs(req).yields(null, res, body);

        route.callApi(req, function (err, data) {
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            done();
        });
    });
});
