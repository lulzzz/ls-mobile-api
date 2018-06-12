/**
 * Created by smriti on 20/04/18.
 */

var path = require('path'),
    inventoryQueryBuilder = require(path.resolve('./lib/builder/inventoryQueryBuilder','')),
    expect = require('chai').expect;

describe('Build inventory params', function() {
    it('Constructs empty query model', function(done) {
        var req = {query: {}, headers:[]};
        var queryModel = inventoryQueryBuilder.buildInvParams(req);
        expect(queryModel.eid).to.be.equal(undefined);
        expect(queryModel.mid).to.be.equal(undefined);
        expect(queryModel.abType).to.be.equal(undefined);
        expect(queryModel.offset).to.be.equal(undefined);
        done();
    });

   it('Constructs query model with entity filter', function(done){
    var req = {headers: []};
       req.query ={entity_id: 1344724, mtags: "Injections", abty:200, state: "Goa"};
       var queryModel = inventoryQueryBuilder.buildInvParams(req);
       queryModel.loc = JSON.parse(queryModel.loc);
       expect(queryModel.eid).to.be.equal(1344724);
       expect(queryModel.mid).to.be.equal(undefined);
       expect(queryModel.mtags).to.be.equal("Injections");
       expect(queryModel.etags).to.be.equal(undefined);
       expect(queryModel.abType).to.be.equal(200);
       expect(queryModel.loc.state).to.be.equal("Goa");
       expect(queryModel.loc.district).to.be.equal(undefined);
       expect(queryModel.loc.taluk).to.be.equal(undefined);
       expect(queryModel.user).to.be.equal(undefined);
       done();
   });

    it('Constructs query model with material filter', function(done){
        var req = {headers: []};
        req.query ={material_id: 3345726, etags: "DVS", abty:202, state: "Assam", district: "Baksa", taluk: "Barama"};
        var queryModel = inventoryQueryBuilder.buildInvParams(req);
        queryModel.loc = JSON.parse(queryModel.loc);
        expect(queryModel.eid).to.be.equal(undefined);
        expect(queryModel.mid).to.be.equal(3345726);
        expect(queryModel.mtags).to.be.equal(undefined);
        expect(queryModel.etags).to.be.equal("DVS");
        expect(queryModel.abType).to.be.equal(202);
        expect(queryModel.loc.state).to.be.equal("Assam");
        expect(queryModel.loc.district).to.be.equal("Baksa");
        expect(queryModel.loc.taluk).to.be.equal("Barama");
        expect(queryModel.user).to.be.equal(undefined);
        done();
    });
});

describe('Build inventory detail params', function() {
   it('Constructs empty query model', function(done) {
       var req = {query: {}, headers:[]};
       var queryModel = inventoryQueryBuilder.buildInvDetailParams(req);
       expect(queryModel.eid).to.be.equal(undefined);
       expect(queryModel.mid).to.be.equal(undefined);
       expect(queryModel.size).to.be.equal(undefined);
       expect(queryModel.offset).to.be.equal(undefined);
       done();
   });

    it('Constructs query model for given filters', function(done) {
        var req = {headers: []};
        req.query = {entity_id: 1344726, material_id: 3345729, of:0, sz: 50};
        var queryModel = inventoryQueryBuilder.buildInvDetailParams(req);
        expect(queryModel.eid).to.be.equal(1344726);
        expect(queryModel.mid).to.be.equal(3345729);
        expect(queryModel.offset).to.be.equal(0);
        expect(queryModel.size).to.be.equal(50);
        expect(queryModel.user).to.be.equal(undefined);
        done();
    });

});