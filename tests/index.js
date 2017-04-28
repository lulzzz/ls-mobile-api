var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


/*describe('Array', function() {
 describe('#indexOf()', function() {
 it('should return -1 when the value is not present', function() {
 chai.assert.equal(-1, [1,2,3].indexOf(4),"array index out of bounds");
 });
 });
 });*/


describe('login', function () {

    it('should allow user to login  POST /auth/login', function (done) {
        chai.request('http://localhost:3000')
            .post('/auth/login')
            .auth('kumarg', '123456')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });

    it('should allow user to generate otp  POST /auth/generateotp', function (done) {
        chai.request('http://localhost:3000')
            .post('/auth/generateotp')
            .send('kumarg')
            .end(function (err, res) {
                res.should.have.status(201);
                //res.should.be.json;
                //res.body.should.be.a('object');
                done();
            });
    });

    it('should allow user to validate otp  POST /auth/validateotp', function (done) {
        chai.request('http://localhost:3000')
            .post('/auth/validateotp')
            .send({'uid': 'kumarg', 'otp': 615154})
            .end(function (err, res) {
                res.should.have.status(202);
                //res.should.be.json;
                //res.body.should.be.a('object');
                done();
            });
    });

    it('should allow user to validate otp  POST /auth/resetpassword', function (done) {
        chai.request('http://localhost:3000')
            .post('/auth/resetpassword')
            .send({'uid': 'kumarg', 'npd': '123456'})
            .end(function (err, res) {
                res.should.have.status(201);
                //res.should.be.json;
                //res.body.should.be.a('object');
                done();
            });
    });

});
