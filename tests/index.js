var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var sinon = require('sinon');
var mocha = require('mocha');
// var grunt = require('grunt-cli');
var mockserver = require('mockserver-grunt');


chai.use(chaiHttp);


/*describe('Array', function() {
 describe('#indexOf()', function() {
 it('should return -1 when the value is not present', function() {
 chai.assert.equal(-1, [1,2,3].indexOf(4),"array index out of bounds");
 });
 });
 });*/


/*describe('login', function () {

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

});*/
/*

var spy = sinon.spy();

//We can call a spy like a function
spy('Hello', 'World');

//Now we can get information about the call
console.log("<3 Hello SINON <3" + spy.firstCall.args); //output: ['Hello', 'World']

var user = {
    setName: function(name){
    this.name = name;
    }
}

//Create a spy for the setName function
var setNameSpy = sinon.spy(user, 'setName');

//Now, any time we call the function, the spy logs information about it
user.setName('Darth Vader');

//Which we can see by looking at the spy object
console.log(setNameSpy.callCount); //output: 1

//Important final step - remove the spy
setNameSpy.restore();

function myFunction(condition, callback){
    if(condition){
        callback();
    }
}

var assert = chai.assert;

describe('myFunction', function() {
    it('should call the callback function', function() {
        var callback = sinon.spy();

        myFunction(true, callback);
        assert(callback.calledOnce);
        assert(callback.calledOnce, 'Callback was not called once');
        sinon.assert.calledOnce(callback);
    });
});*/
/*

var spy = sinon.spy();

//We can call a spy like a function
spy('Hello', 'World');

//Now we can get information about the call
console.log("<3 Hello SINON <3" + spy.firstCall.args); //output: ['Hello', 'World']

var user = {
    setName: function(name){
    this.name = name;
    }
}

//Create a spy for the setName function
var setNameSpy = sinon.spy(user, 'setName');

//Now, any time we call the function, the spy logs information about it
user.setName('Darth Vader');

//Which we can see by looking at the spy object
console.log(setNameSpy.callCount); //output: 1

//Important final step - remove the spy
setNameSpy.restore();

function myFunction(condition, callback){
    if(condition){
        callback();
    }
}

var assert = chai.assert;

describe('myFunction', function() {
    it('should call the callback function', function() {
        var callback = sinon.spy();

        myFunction(true, callback);
        assert(callback.calledOnce);
        assert(callback.calledOnce, 'Callback was not called once');
        sinon.assert.calledOnce(callback);
    });
});

mocha.setup('bdd');
*/

/*

function getUserDevicetoken(userId, appname){
    var total = store.get(value) || 0;
    var newtotal = total + amount;
    store.set(value, newtotal);
}

describe('getUDToken', function() {
    it('should return a token for a given userId and appName', function() {
        var storeMock = sinon.mock(store);
        storeMock.expects('get').withArgs('data').returns(0);
        storeMock.expects('set').once().withArgs('data', 1);

        incrementStoredData('data', 1);

        storeMock.restore();
        storeMock.verify();
    });
});  */


/*
function apiError (status, message) {
    var err = new Error(message);
    err.status = status;
    return err;
}

function client (path, callback) {

    var xhr = window.XMLHttpRequest();

    xhr.addEventListener('load', function () {
        var body;
        try {
            body = JSON.parse(this.responseText);
        }
        catch (e) {
            return callback('Invalid JSON:', this.responseText);
        }

        if (this.status < 200 || this.status > 299) {
            return callback(apiError(this.status, body.message));
        }

        return callback(null, body);
    });

    xhr.open('get', path);
    xhr.send();
}

describe('client', function () {

    var server = null;

    beforeEach(function () {

        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();
    });

    describe('responding to a generic request', function () {

        beforeEach(function () {
            var okResponse = [
                200,
                { 'Content-type': 'application/json' },
                '{"hello":"world"}'
            ];

            server.respondWith('GET', '/hello', okResponse);
        });

        it('returns correct body', function (done) {
            client('/hello', function (err, json) {
                if (err) return done(err);
                expect(json.hello).toBe('world');
                done();
            });

            server.respond();
        });
    });
});*/

/*
 Load Sinon.JS in the SpecRunner:
 <script type="text/javascript" src="lib/jasmine-1.0.1/jasmine.js"></script>
 <script type="text/javascript" src="lib/jasmine-1.0.1/jasmine-html.js"></script>
 <script type="text/javascript" src="sinon-1.0.0.js"></script>
 <script type="text/javascript" src="sinon-ie-1.0.0.js"></script>
 http://cjohansen.no/sinon/
 */
/*

describe("SinonFakeServerWithJasmine", function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();
    });

    it("should fake a jQuery ajax request", function () {
        server.respondWith("GET", "/something",
            [200, { "Content-Type": "application/json" },
                '{ "stuff": "is", "awesome": "in here" }']);

        var callbacks = [sinon.spy(), sinon.spy()];

        jQuery.ajax({
            url: "/something",
            success: callbacks[0]
        });

        jQuery.ajax({
            url: "/other",
            success: callbacks[1]
        });

        console.log(server.requests); // Logs all requests so far
        server.respond(); // Process all requests so far

        expect(callbacks[0].calledOnce).toBeTruthy();
        expect(callbacks[0].calledWith({
            stuff: "is",
            awesome: "in here"
        })).toBeTruthy();

        expect(callbacks[1].calledOnce).toBeFalsy(); // Unknown URL /other received 404
    });
});
*/

/*
var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('twitstat', function () {
    var twitstat;
    var request;
    before(function () {
        request = sinon.stub();
        twitstat = proxyquire('../lib/twitstat', {'request': request});
    });

    it('should report a LOW popularity when given url is shared less than 10 times', function (done) {
        var expectedEndpoint = 'http://urls.api.twitter.com/1/urls/count.json?url=some-url.com';
        var body = JSON.stringify({
            count: 9,
            url: "http://some-url.com/"
        });
        request.withArgs(expectedEndpoint).yields(null, null, body);

        twitstat.getPopularity('some-url.com', function (err, data) {
            expect(err).to.be.null;
            expect(data).to.equal(JSON.stringify({
                "url": "http://some-url.com/",
                "popularity": "LOW"
            }));
            done();
        });
    });
});

mocha.setup('bdd');
*/

/*

function getUserDevicetoken(userId, appname){
    var total = store.get(value) || 0;
    var newtotal = total + amount;
    store.set(value, newtotal);
}

describe('getUDToken', function() {
    it('should return a token for a given userId and appName', function() {
        var storeMock = sinon.mock(store);
        storeMock.expects('get').withArgs('data').returns(0);
        storeMock.expects('set').once().withArgs('data', 1);

        incrementStoredData('data', 1);

        storeMock.restore();
        storeMock.verify();
    });
});  */


/*
function apiError (status, message) {
    var err = new Error(message);
    err.status = status;
    return err;
}

function client (path, callback) {

    var xhr = window.XMLHttpRequest();

    xhr.addEventListener('load', function () {
        var body;
        try {
            body = JSON.parse(this.responseText);
        }
        catch (e) {
            return callback('Invalid JSON:', this.responseText);
        }

        if (this.status < 200 || this.status > 299) {
            return callback(apiError(this.status, body.message));
        }

        return callback(null, body);
    });

    xhr.open('get', path);
    xhr.send();
}

describe('client', function () {

    var server = null;

    beforeEach(function () {

        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();
    });

    describe('responding to a generic request', function () {

        beforeEach(function () {
            var okResponse = [
                200,
                { 'Content-type': 'application/json' },
                '{"hello":"world"}'
            ];

            server.respondWith('GET', '/hello', okResponse);
        });

        it('returns correct body', function (done) {
            client('/hello', function (err, json) {
                if (err) return done(err);
                expect(json.hello).toBe('world');
                done();
            });

            server.respond();
        });
    });
});*/

/*
 Load Sinon.JS in the SpecRunner:
 <script type="text/javascript" src="lib/jasmine-1.0.1/jasmine.js"></script>
 <script type="text/javascript" src="lib/jasmine-1.0.1/jasmine-html.js"></script>
 <script type="text/javascript" src="sinon-1.0.0.js"></script>
 <script type="text/javascript" src="sinon-ie-1.0.0.js"></script>
 http://cjohansen.no/sinon/
 */
/*

describe("SinonFakeServerWithJasmine", function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();
    });

    it("should fake a jQuery ajax request", function () {
        server.respondWith("GET", "/something",
            [200, { "Content-Type": "application/json" },
                '{ "stuff": "is", "awesome": "in here" }']);

        var callbacks = [sinon.spy(), sinon.spy()];

        jQuery.ajax({
            url: "/something",
            success: callbacks[0]
        });

        jQuery.ajax({
            url: "/other",
            success: callbacks[1]
        });

        console.log(server.requests); // Logs all requests so far
        server.respond(); // Process all requests so far

        expect(callbacks[0].calledOnce).toBeTruthy();
        expect(callbacks[0].calledWith({
            stuff: "is",
            awesome: "in here"
        })).toBeTruthy();

        expect(callbacks[1].calledOnce).toBeFalsy(); // Unknown URL /other received 404
    });
});
*/

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('twitstat', function () {
    var twitstat;
    var request;
    before(function () {
        request = sinon.stub();
        twitstat = proxyquire('../twitstat/lib/twitstat', {'request': request});
    });

    it('should report a LOW popularity when given url is shared less than 10 times', function (done) {
        var expectedEndpoint = 'http://abc.json?url=some-url.com';
        var body = JSON.stringify({
            count: 9,
            url: "http://some-url.com/"
        });
        request.withArgs(expectedEndpoint).yields(null, 'smriti', body);

        twitstat.getPopularity('some-url.com', function (err, data) {
            expect(err).to.be.null;
            console.log(data);
            expect(data).to.equal(JSON.stringify({
                "url": "http://some-url.com/",
                "popularity": "LOW"
            }));
            console.log(data);
            done();
        });
    });
});
