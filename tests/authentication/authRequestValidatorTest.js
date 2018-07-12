/**
 * @author smriti
 */

var path = require('path'),
    validator = require(path.resolve('./lib/validator/authRequestValidator', '')),
    assert = require('chai').expect;


describe('Authentication request validator', function () {

    it('Validates with valid parameters', function (done) {
        var model = {username: "smriti", password: "1234567890"};
        validator.validateLoginRequest(model);
        done();
    });

    it('Validates with invalid parameters', function (done) {
        var model = {};
        try {
            validator.validateLoginRequest(model);
        } catch (exception) {
            assert(exception.status).to.be.equal(400);
            assert(exception.message.message).to.be.equal("Bad Request :User ID is required");
        }
        done();
    });

});

describe('2FA OTP generation request validator', function () {

    it('Validates with valid parameters', function (done) {
        var model = {body: {user_id: "testUser"}};
        validator.validate2FAOTPGenerationRequest(model);
        done();
    });

    it('Validates with invalid parameters', function (done) {
        var model = {body: {}};
        try {
            validator.validate2FAOTPGenerationRequest(model);
        } catch (exception) {
            assert(exception.status).to.be.equal(400);
            assert(exception.message.message).to.be.equal("Bad Request :User ID is required");
        }
        done();
    });
});