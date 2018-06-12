/**
 * Created by smriti on 20/04/18.
 */

var path = require('path'),
    conversationQueryBuilder = require(path.resolve('./lib/builder/conversationQueryBuilder','')),
    expect = require('chai').expect;

describe('Add message param', function() {
   it('Constructs empty query model', function(done) {
      var req = {query: {}, body: {content: {}}, headers: {}};
       var queryModel = conversationQueryBuilder.addMessageParam(req);
       expect(queryModel.objectId).to.be.equal(undefined);
       expect(queryModel.message).to.be.equal(undefined);
       expect(queryModel.user).to.be.equal(undefined);
       done();
   });

   it('Constructs query model with data', function(done) {
      var req = {query: {}};
       req.body = {object_id: "#001", object_type: "ORDER", conversation_id: "0123-xwj-98d", content:{data: "Materials added to Order"}};
       req.headers = [];
       req.headers['x-request-id'] = "098737879279-dhjdjjh-283y8y3";
       req.headers['x-access-user'] = "system";
       req.headers['x-real-ip'] = "";
       var queryModel = conversationQueryBuilder.addMessageParam(req);
       expect(queryModel.objectId).to.be.equal("#001");
       expect(queryModel.objectType).to.be.equal("ORDER");
       expect(queryModel.conversationId).to.be.equal("0123-xwj-98d");
       expect(queryModel.message).to.be.equal("Materials added to Order");
       expect(queryModel.xforward).to.be.equal('');
       done();
   });
});

describe('Get message param', function() {
    it('Constructs empty query model', function(done) {
        var req = {query: {}, headers: {}};
        var queryModel = conversationQueryBuilder.getMessageParam(req);
        expect(queryModel.objectId).to.be.equal(undefined);
        expect(queryModel.objectType).to.be.equal("APPROVAL");
        expect(queryModel.reqId).to.be.equal(undefined);
        expect(queryModel.message).to.be.equal(undefined);
        done();
    });

    it('Constructs query model with data', function(done) {
        var req = {query: {object_id: "#002", object_type: "ORDER", conversation_id:"2783-xwj-289d"}};
        req.headers = [];
        req.headers['x-access-user'] = "system";
        req.headers['x-request-id'] = "098737879279-dhjdjjh-283y8y3";
        req.headers['x-real-ip'] = "x278sbd91dhb1";
        var queryModel = conversationQueryBuilder.getMessageParam(req);
        expect(queryModel.objectId).to.be.equal("#002");
        expect(queryModel.objectType).to.be.equal("ORDER");
        expect(queryModel.conversationId).to.be.equal("2783-xwj-289d");
        expect(queryModel.user).to.be.equal("system");
        expect(queryModel.xforward).to.be.equal("x278sbd91dhb1");
        done();

    });
});
