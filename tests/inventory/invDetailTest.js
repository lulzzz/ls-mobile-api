/**
 * Created by smriti on 21/11/17.
 */

var path = require('path'),
    invServices = require(path.resolve('./lib/restclient/inventory/invdetail', '')),
    expect = require('chai').expect;

describe('Construct inventory by kiosk request payload', function () {
    it('validates the request object', function (done) {
        var params = {reqId: "12#34", user: "smriti", eid: 1, mtags: "Open Vials, Injections"};
        var options = invServices.constructInventoryByKioskRequestPayload(params);
        expect(options.qs.tag).to.be.equal("Open Vials, Injections");
        expect(options.qs.etag).to.be.equal(undefined);
        expect(options.qs.material_id).to.be.equal(undefined);
        expect(options.qs.entity_id).to.be.equal(1);
        expect(options.headers["x-access-user"]).to.be.equal(params.user);
        done();
    });
});

describe('Construct inventory by material request payload', function() {
   it('validates the request object', function(done) {
       var params = {reqId: "ab%rt", user: "admin", mid: 3345739, etags: "DVS"};
       var options = invServices.constructInventoryByMaterialRequestPayload(params);
       expect(options.qs.etag).to.be.equal("DVS");
       expect(options.qs.tag).to.be.equal(undefined);
       expect(options.qs.material_id).to.be.equal(3345739);
       expect(options.qs.entity_id).to.be.equal(undefined);
       expect(options.headers["x-access-user"]).to.be.equal(params.user);
       done();
   });
});