/**
 * Created by smriti on 20/04/18.
 */

var path = require('path'),
    userDeviceQueryBuilder = require(path.resolve('./lib/builder/userDeviceQueryBuilder.js','')),
    expect = require('chai').expect;

describe('Build add/edit params', function() {
   it('Constructs empty model', function(done) {
      var req = {query: {}, headers: []};
       var queryModel = userDeviceQueryBuilder.buildAddEditParams(req);
       expect(queryModel.userid).to.be.equal(undefined);
       expect(queryModel.token).to.be.equal(undefined);
       expect(queryModel.appname).to.be.equal(undefined);
       expect(queryModel.user).to.be.equal(undefined);
       done();
   });

    it('Constructs query model for data', function(done) {
        var req = {headers: []};
        req.query = {userid: "system", appname: "LS"};
        var queryModel = userDeviceQueryBuilder.buildAddEditParams(req);
        expect(queryModel.userid).to.be.equal("system");
        expect(queryModel.appname).to.be.equal("LS");
        done();
    });
});