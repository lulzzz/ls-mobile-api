/**
 * @author smriti
 */

var path = require('path'),
    builder = require(path.resolve('./lib/builder/authQueryBuilder','')),
    assert = require('chai').expect,
    md5 = require('md5');

describe('Build query model', function() {

    it('Validates for older app version', function(done) {
        var request = {headers: [], body: {}};
        request.headers['authorization'] = "Basic dGVzdFVzZXI6MTIzNDU2Nzg5MA==";
        request.headers['x-app-name'] = "mobile";
        request.headers['x-app-ver'] = "1.0.2";
        var model = builder.buildQueryModel(request, true);
        assert(model.username).to.be.equal("testUser");
        assert(model.password).to.be.equal("1234567890");
        assert(model.otp).to.be.an('undefined');
        assert(model.cookie).to.be.an('undefined');
        assert(model.appName).to.be.equal("mobile");
        assert(model.skipTwoFactorAuthentication).to.be.equal(true);
        done();
    });

    it('Validates for newer app version without otp and device information', function(done) {
        var request = {headers: [], body: {}};
        request.headers['authorization'] = "Basic dGVzdFVzZXI6MTIzNDU2Nzg5MA==";
        request.headers['x-app-name'] = "mobile";
        request.headers['x-app-ver'] = "1.0.2";
        var model = builder.buildQueryModel(request, false);
        assert(model.username).to.be.equal("testUser");
        assert(model.password).to.be.equal("1234567890");
        assert(model.otp).to.be.an('undefined');
        assert(model.cookie).to.be.an('undefined');
        assert(model.appName).to.be.equal("mobile");
        assert(model.skipTwoFactorAuthentication).to.be.equal(false);
        done();

    });

    it('Validates for newer app version with otp', function(done) {
        var request = {headers: [], body: {}};
        request.headers['authorization'] = "Basic dGVzdFVzZXI6MTIzNDU2Nzg5MA==";
        request.body.otp = 123456;
        var model = builder.buildQueryModel(request, false);
        assert(model.username).to.be.equal("testUser");
        assert(model.password).to.be.equal("1234567890");
        assert(model.otp).to.be.equal(123456);
        assert(model.cookie).to.be.an('undefined');
        assert(model.appName).to.be.an('undefined');
        assert(model.skipTwoFactorAuthentication).to.be.equal(false);
        done();
    });

    it('Validates for newer app with device information', function(done) {
        var request = {headers: [], body: {}};
        var key = "_di" + md5("testUser");

        request.headers['authorization'] = "Basic dGVzdFVzZXI6MTIzNDU2Nzg5MA==";
        request.headers[key] = "0b109f03e1d88637fdad45bb6e15d7d526838hs28";
        var model = builder.buildQueryModel(request, false);
        assert(model.username).to.be.equal("testUser");
        assert(model.password).to.be.equal("1234567890");
        assert(model.otp).to.be.an('undefined');
        assert(model.appName).to.be.an('undefined');
        assert(model.skipTwoFactorAuthentication).to.be.equal(false);
        assert(model.cookie).to.be.equal(key +"=0b109f03e1d88637fdad45bb6e15d7d526838hs28;");
        done();
    });
});
