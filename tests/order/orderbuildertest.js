/**
 * Created by yuvaraj on 27/06/18.
 */

var path = require('path'),
    orderQueryBuilder = require(path.resolve('./lib/builder/orderQueryBuilder', '')),
    expect = require('chai').expect;

describe('Constructs Order request', function () {
    it('Construct for empty data', function (done) {
        var req = {};
        req.query = {};
        req.params = {};
        req.headers = [];
        req.headers['x-access-user'] = "abc123";
        req.headers['x-request-id'] = "XYZ#123";
        var data = orderQueryBuilder.buildQueryParams(req);
        expect(data.reqId).to.be.equal("XYZ#123");
        expect(data.entityId).to.be.empty;
        done();
    });

    it('Constructs with filters as params', function (done) {
        var req = {};
        req.query = {};
        req.params = {};
        req.headers = [];
        req.query.entity_id= "1343816";
        req.query.order_status="pn";
        req.query.order_type="prc";
        req.query.related_entity_id="1343823";
        req.query.size=50;
        req.headers['x-request-id'] = "XYZ#123";

        var data = orderQueryBuilder.buildQueryParams(req);
        expect(data.entityId).to.be.equal("1343816");
        expect(data.status).to.be.equal("pn");
        expect(data.otype).to.be.equal("prc");
        expect(data.offset).to.be.equal(0);
        expect(data.size).to.be.equal(50);
        expect(data.linkedKioskId).to.be.equal("1343823");
        done();
    });
});

