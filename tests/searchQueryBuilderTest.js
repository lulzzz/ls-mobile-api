/**
 * Created by smriti on 20/04/18.
 */

var path = require('path'),
    searchQueryBuilder = require(path.resolve('./lib/builder/searchQueryBuilder','')),
    expect = require('chai').expect;

describe('Build search params', function() {
   it('Constructs empty query model', function(done) {
      var req = {query: {}, headers: []};
       var queryModel = searchQueryBuilder.buildSearchParams(req);
       expect(queryModel.tags).to.be.an('undefined');
       expect(queryModel.q).to.be.an('undefined');
       expect(queryModel.offset).to.be.an('undefined');
       expect(queryModel.user).to.be.an('undefined');
       done();
   });

    it('Constructs query model for data', function(done) {
        var req = {query: {tags: "entity_tags", q: "India GMSD", of: 0, sz: 50}};
         req.headers= [];
        var queryModel = searchQueryBuilder.buildSearchParams(req);
        expect(queryModel.tags).to.be.equal("entity_tags");
        expect(queryModel.q).to.be.equal("India GMSD");
        expect(queryModel.offset).to.be.equal(0);
        expect(queryModel.size).to.be.equal(50);
        expect(queryModel.user).to.be.an('undefined');
        done();
    })
});
