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
            body:{
                "content": {
                    "type": "text",
                    "data": "test conv 1234 testing convID123"
                },
                "user_id": "yuvaraj",
                "conversation_id": "4bb1b27d-2b4d-4aa8-9dbf-a559ec5da3f5"
            }
        };

        var body = JSON.stringify({
            "message_id": "f44f6c59-c794-49da-a482-0027622d67e8",
            "conversation_id": "59a619aa-7d0a-43d9-9de1-12e7f2f14ea7"
        });
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
        var expectedEndpoint = 'http://localhost:8080/s2/api/APPROVAL/345321';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/conversation/message/APPROVAL/345321",
            method: "POST",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            },
            body:{
                "content": {
                    "type": "text",
                    "data": "test conv 1234 abcdqwertyuiop"
                },
                "user_id": "yuvaraj",
                "object_type": "APPROVAL",
                "object_id":"ABC123"
            }
        };

        var body = JSON.stringify({
            "message_id": "f44f6c59-c794-49da-a482-0027622d67e8",
            "conversation_id": "59a619aa-7d0a-43d9-9de1-12e7f2f14ea7"
        });
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
    it('get messages for a conversation', function (done) {
        this.timeout(1000);
        var expectedEndpoint = 'http://localhost:8080/s2/api/conversation/messages';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/conversation/messages",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            },
            qs:{
                object_type: "APPROVAL",
                object_id:"1234abc"
            }
        };

        var body = JSON.stringify({
            "results": [
                {
                    "messageId": "c692f188-faa1-4004-82e1-7701a99f197a",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "message": "testing conversation 21 June",
                    "createDate": "21/6/17 10:08 AM",
                    "cts": 1498019918000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "c55732b3-829c-4cad-84bb-4930485ff3e0",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "message": "testing conversation",
                    "createDate": "21/6/17 10:07 AM",
                    "cts": 1498019874000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "244a516a-6ed5-48ee-b0eb-f2a31b38e841",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "message": "test wo conv id",
                    "createDate": "20/6/17 7:46 PM",
                    "cts": 1497968182000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "607c016c-9da9-4c74-994f-c3d8bf8b2afe",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "message": "test wo conv id",
                    "createDate": "20/6/17 7:43 PM",
                    "cts": 1497968014000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "e0f38259-04f4-4e89-96f0-3270beb53a55",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "message": "test wo conv id",
                    "createDate": "20/6/17 7:31 PM",
                    "cts": 1497967265000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "3c1f7dbc-eb99-43a6-b6d8-fa87a17fcfe7",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "message": "testing conversation 12345678",
                    "createDate": "20/6/17 7:05 PM",
                    "cts": 1497965748000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "50d87677-ad7a-4052-b839-22a349b6adcf",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "message": "testing conversation",
                    "createDate": "20/6/17 7:05 PM",
                    "cts": 1497965705000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "d5c7f0d6-f98d-4ed8-9956-48d55532bf2e",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "createDate": "20/6/17 5:34 PM",
                    "cts": 1497960252000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "1a907ade-3dfb-4778-8608-677f0d3cdf4b",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "createDate": "20/6/17 5:29 PM",
                    "cts": 1497959971000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "52e55694-15d8-44bf-98e8-6776c1ead5e4",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "createDate": "20/6/17 5:28 PM",
                    "cts": 1497959926000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "7a04f4f2-d26a-4299-b0a7-a001cc71fd3e",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "createDate": "20/6/17 5:28 PM",
                    "cts": 1497959908000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "cf2e6a9b-5838-4a1a-a27f-d1ade61f7f75",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "createDate": "20/6/17 5:26 PM",
                    "cts": 1497959804000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "db7e96e8-6d93-47e2-99f5-c23016911a90",
                    "conversationId": "c610e394-27d5-4e14-a37f-ff2a2234a3d0",
                    "createDate": "20/6/17 5:07 PM",
                    "cts": 1497958667000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                }
            ],
            "numFound": 13,
            "offset": 0
        });
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
    it('get messages for a type and type_id', function (done) {
        this.timeout(1000);
        var expectedEndpoint = 'http://localhost:8080/s2/api/conversation/messages';
        //var req= {};
        var req = {
            url: "http://localhost:8080/s2/api/conversation/messages",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "yuvaraj"
            },
            qs:{
                objType: "APPROVAL",
                objId:"456321"
            }
        };

        var body = JSON.stringify({
            "results": [
                {
                    "messageId": "dd7caa99-fbf2-415a-b078-62af0a698c57",
                    "conversationId": "ce04db03-a061-46dd-8911-b0ee035bb5fd",
                    "message": "test 12245 con id",
                    "createDate": "21/6/17 12:08 PM",
                    "cts": 1498027117000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "7195d6fd-6f3d-47d3-8f9d-6cdc22eb8fb6",
                    "conversationId": "ce04db03-a061-46dd-8911-b0ee035bb5fd",
                    "message": "test 12245 usid",
                    "createDate": "21/6/17 10:52 AM",
                    "cts": 1498022576000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "8bb478c0-22cb-4c30-9a24-982c956e84b6",
                    "conversationId": "ce04db03-a061-46dd-8911-b0ee035bb5fd",
                    "message": "test 12245 con id",
                    "createDate": "21/6/17 10:49 AM",
                    "cts": 1498022374000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "37939f67-b2f1-42d3-a549-5bcc9ed9a601",
                    "conversationId": "ce04db03-a061-46dd-8911-b0ee035bb5fd",
                    "message": "test 12245",
                    "createDate": "21/6/17 10:46 AM",
                    "cts": 1498022179000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                },
                {
                    "messageId": "8091b2f7-7f94-417e-b129-6be995e39491",
                    "conversationId": "ce04db03-a061-46dd-8911-b0ee035bb5fd",
                    "message": "testing conversation 21 June",
                    "createDate": "21/6/17 10:30 AM",
                    "cts": 1498021213000,
                    "userId": "yuvaraj",
                    "userName": "Yuvaraj BH"
                }
            ],
            "numFound": 5,
            "offset": 0
        });
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