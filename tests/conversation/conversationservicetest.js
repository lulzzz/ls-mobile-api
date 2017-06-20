/**
 * Created by yuvaraj on 20/06/17.
 */

var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe('conversation test', function () {
    var request, route;
    beforeEach(function () {
        "use strict";
        request = sinon.stub();
        route = proxyquire('../../lib/restclient/restclient.js', {'request': request});
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
});