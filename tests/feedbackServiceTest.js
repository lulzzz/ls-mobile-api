var sinon = require('sinon'),
    expect = require('chai').expect,
    path = require('path'),
    restclient = require(path.resolve('./lib/restclient/restclient')),
    service = require(path.resolve('./lib/restclient/collaboration/feedbackService')),
    GatewayError = require(path.resolve('./lib/error/gatewayerror', ''));

describe('submit feedback test', function () {
    var restclientstub;
    beforeEach(function(done) {
        "use strict";
        restclientstub = sinon.stub(restclient,'callApi')
        done();
    });
    afterEach(function(done) {
        "use strict";
        restclientstub.restore();
        done();
    });

    it('post feedback success',function (done) {

        var payload = {};
        payload.headers = [];
        payload.headers['x-app-name']='mobile';
        payload.headers['x-access-user']='kumar';
        payload.headers['x-app-ver']='1.0.0';
        payload.body = {"userId":"kumar", "text": "sample text"};
        payload.json=true;
        payload.timeout=30000;

        restclientstub.yields(null,{status:200});

        service.submitFeedback(payload,function (err,data) {
            expect(err).to.be.null;
            expect(data.status).to.be.equal(200);
            done();
        });

    });

    it('post feedback error',function (done) {

        var payload = {};
        payload.headers = [];
        payload.headers['x-app-name']='mobile';
        payload.headers['x-access-user']='kumar';
        payload.headers['x-app-ver']='1.0.0';
        payload.body = {"userId":"kumar", "text": "sample text"};
        payload.json=true;
        payload.timeout=30000;

        restclientstub.yields(new GatewayError('server error', 500) ,null);

        service.submitFeedback(payload,function (err,data) {
            expect(err.status).to.be.equal(500);
            expect(data).to.be.null;
            done();
        });

    });


});