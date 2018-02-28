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

    it('Constructs asset detail response with serial no and manufacturer code as params', function (done) {
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
        req.query.did ="1343724";

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

describe('Constructs the asset sensor response', function () {

    it('Construct for empty data', function (done) {
        var req = {query: {}, params: {}};
        var data = assetQueryBuilder.buildTempSensorParams(req);
        expect(data, {});
        done();
    });

    it('Constructs asset detail response with did as query params', function (done) {
        var req = {};
        req.query = {};
        req.params = {};
        req.headers = [];
        req.params.manufacturer_code= "Electrolux";
        req.params.monitoring_position_id=2;
        req.query.page=1;
        req.query.size=50;
        req.params.serial_no ="2200-ILR-0000003";
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";


        var data = assetQueryBuilder.buildTempSensorParams(req);
        expect(data.did, "2200-ILR-0000003");
        expect(data.vid, "Electrolux");
        expect(data.page, 1);
        expect(data.size, "50");
        expect(data.mpid, 2);
        expect(data.url, "Electrolux/2200-ILR-0000003/2?page=1&size=50");
        done();
    });
});

describe('Constructs the asset status builder response', function () {

    it('Construct for empty data', function (done) {
        var req = {query: {}, params: {}, body:{}};
        var data = assetQueryBuilder.buildAssetStatusParams(req);
        expect(data, {});
        done();
    });

    it('Constructs asset status query', function (done) {
        var req = {params: {}, body: {}, headers:[]};
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";
        req.headers['x-access-user'] = "smriti";
        req.params.serial_no = "UAS-009-QWE";
        req.params.manufacturer_code = "haier";
        req.body.status_code=1;
        req.body.status_updated_time="3345632161";

        var data = assetQueryBuilder.buildAssetStatusParams(req);
        expect(data.url, "haier/" + encodeURIComponent(req.params.serial_no) + "/status");
        expect(data.body.st, 1);
        expect(data.token, "ABC#123");
        expect(data.reqId, "XYZ#123");
        done();
    });
});

