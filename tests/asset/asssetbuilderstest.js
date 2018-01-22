/**
 * Created by yuvaraj on 22/01/18.
 */

var path = require('path'),
    assetQueryBuilder = require(path.resolve('./lib/builder/assetQueryBuilder', '')),
    expect = require('chai').expect,
    sinon = require('sinon'),
    mocha = require('mocha');

describe('Constructs the asset detail response', function () {

    it('Construct for empty data', function (done) {
        var req = {query: {}, params: {}};
        var data = assetQueryBuilder.buildTempAlertParams(req);
        expect(data, {});
        done();
    });

    it('Constructs asset detail response with asset id as params', function (done) {
        var req = {};
        req.query = {};
        req.params = {};
        req.headers = [];
        req.query.vid= "Electrolux";
        req.query.mpid=2;
        req.query.page=1;
        req.query.sz=50;
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";
        req.params.asset_id ="2200-ILR-0000003";
        console.log("vid:" + req.query.vid);

        
        var data = assetQueryBuilder.buildTempAlertParams(req);
        expect(data.did, "2200-ILR-0000003");
        expect(data.vid, "Electrolux");
        expect(data.page, 1);
        expect(data.size, "50");
        expect(data.mpid, 2);
        expect(data.url, "Electrolux/2200-ILR-0000003/2?page=1&size=50");
        done();
    });
    
    it('Constructs asset detail response with did as query params', function (done) {
        var req = {};
        req.query = {};
        req.params = {};
        req.headers = [];
        req.query.vid= "Electrolux";
        req.query.mpid=2;
        req.query.page=1;
        req.query.sz=50;
        req.query.did ="2200-ILR-0000003";
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";
        
        
        var data = assetQueryBuilder.buildTempAlertParams(req);
        expect(data.did, "2200-ILR-0000003");
        expect(data.vid, "Electrolux");
        expect(data.page, 1);
        expect(data.size, "50");
        expect(data.mpid, 2);
        expect(data.url, "Electrolux/2200-ILR-0000003/2?page=1&size=50");
        done();
    });
});

