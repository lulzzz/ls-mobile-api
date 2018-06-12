/**
 * Created by yuvaraj on 22/01/18.
 */

var path = require('path'),
    assetQueryBuilder = require(path.resolve('./lib/builder/assetQueryBuilder', '')),
    expect = require('chai').expect;

describe('Build temperature alert query model', function () {

    it('Construct for empty data', function (done) {
        var req = {query: {}, params: {}, headers:[]};
        var data = assetQueryBuilder.buildTempAlertParams(req);
        expect(data.page).to.be.equal(0);
        expect(data.size).to.be.equal(50);
        done();
    });

    it('Constructs temperature alert query model with serial no and manufacturer code', function (done) {
        var req = {};
        req.query = {};
        req.params = {};
        req.headers = [];
        req.query.vid= "Electrolux";
        req.query.did= "2200-ILR-0000003";
        req.query.mpid=2;
        req.query.page=1;
        req.query.sz=50;
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";

        var data = assetQueryBuilder.buildTempAlertParams(req);
        expect(data.did).to.be.equal("2200-ILR-0000003");
        expect(data.vid).to.be.equal("Electrolux");
        expect(data.page).to.be.equal(1);
        expect(data.size).to.be.equal(50);
        expect(data.mpid).to.be.equal(2);
        expect(data.url).to.be.equal("Electrolux/2200-ILR-0000003/2?page=1&size=50");
        done();
    });
    
    it('Constructs temperature alert query model with domain Id filter', function (done) {
        var req = {};
        req.query = {vid: "Electrolux", mpid: 2, page: 1, did: "2200-ILR-0000003", sd: 1524472369, ed: 1524472376};
        req.headers = [];
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";

        var data = assetQueryBuilder.buildTempAlertParams(req);
        expect(data.did).to.be.equal("2200-ILR-0000003");
        expect(data.vid).to.be.equal("Electrolux");
        expect(data.page).to.be.equal(1);
        expect(data.size).to.be.equal(50);
        expect(data.mpid).to.be.equal(2);
        expect(data.url).to.be.equal("Electrolux/2200-ILR-0000003/2/1524472369/1524472376?page=1&size=50");
        done();
    });
});

describe('Constructs the temperature sensor query model', function () {

    it('Construct for empty data', function (done) {
        var req = {query: {}, params: {}, headers:[]};
        var data = assetQueryBuilder.buildTempSensorParams(req);
        expect(data.page).to.be.equal(0);
        expect(data.size).to.be.equal(50);
        done();
    });

    it('Constructs the temperature sensor query model with domain Id', function (done) {
        var req = {};
        req.query = {page: 1, start_date:1524471490, end_date: 1524472169};
        req.params = {manufacturer_code: "Electrolux", monitoring_position_id: 2, serial_no: "2200-ILR-0000003"};
        req.headers = [];
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";


        var data = assetQueryBuilder.buildTempSensorParams(req);
        expect(data.did).to.be.equal("2200-ILR-0000003");
        expect(data.vid).to.be.equal("Electrolux");
        expect(data.page).to.be.equal(1);
        expect(data.size).to.be.equal(50);
        expect(data.mpid).to.be.equal(2);
        expect(data.url).to.be.equal("Electrolux/2200-ILR-0000003/2/1524471490/1524472169?page=1&size=50");
        done();
    });
});

describe('Constructs the asset status query model', function () {

    it('Construct for empty data', function (done) {
        var req = {query: {}, params: {}, body:{status_code : 2}, headers:[]};
        var data = assetQueryBuilder.buildAssetStatusParams(req);
        expect(data.body.st).to.be.equal(1);
        done();
    });

    it('Constructs with query params', function (done) {
        var req = {params: {}, body: {}, headers:[]};
        req.headers['x-access-token'] = "ABC#123";
        req.headers['x-request-id'] = "XYZ#123";
        req.headers['x-access-user'] = "smriti";
        req.params.serial_no = "UAS-009-QWE";
        req.params.manufacturer_code = "haier";
        req.body.status_code=1;
        req.body.status_updated_time="3345632161";

        var data = assetQueryBuilder.buildAssetStatusParams(req);
        expect(data.url).to.be.equal("haier/" + encodeURIComponent(req.params.serial_no) + "/status");
        expect(data.body.st).to.be.equal(0);
        expect(data.token).to.be.equal("ABC#123");
        expect(data.reqId).to.be.equal("XYZ#123");
        done();
    });
});

describe('Constructs the asset activity query model', function() {
   it('Constructs for empty data', function(done) {
       var req = {params: {}, query: {}, headers: []};
       var queryModel = assetQueryBuilder.buildAssetActivityParams(req);
       expect(queryModel.vid).to.be.an('undefined');
       expect(queryModel.did).to.be.an('undefined');
       expect(queryModel.page).to.be.equal(0);
       expect(queryModel.size).to.be.equal(50);
       expect(queryModel.auth).not.to.be.an('undefined');
       done();
   });

    it('Constructs with query params', function(done) {
        var req = {params: { manufacturer_code: "haier", serial_no: "20142345728"}, headers:[], query: {}};
        req.headers["x-access-token"] = "1256TBHBhbw8739jd";
        req.headers["x-request-id"] = "134-3ghhdghs8-dwujhwd";
        var queryModel = assetQueryBuilder.buildAssetActivityParams(req);
        expect(queryModel.vid).to.be.equal("haier");
        expect(queryModel.did).to.be.equal("20142345728");
        expect(queryModel.page).to.be.equal(0);
        expect(queryModel.size).to.be.equal(50);
        expect(queryModel.auth).not.to.be.an('undefined');
        done();
    });
});

describe('Constructs asset details query model', function() {
    it('Constructs for empty data', function(done) {
        var req = {params: {}, headers: []};
        var queryModel = assetQueryBuilder.buildAssetDetailsParams(req);
        expect(queryModel.user).to.be.an('undefined');
        expect(queryModel.reqId).to.be.an('undefined');
        expect(queryModel.url).to.be.equal("");
        done();
    });

   it('Constructs with query params', function(done) {
       var req = {params: {manufacturer_code: "electrolux", "serial_no": "ILR01"}, headers:[]};
       req.headers["x-access-user"] = "system";
       var queryModel = assetQueryBuilder.buildAssetDetailsParams(req);
       expect(queryModel.url).to.be.equal("electrolux/ILR01");
       expect(queryModel.user).to.be.equal("system");
       done();
   });
});

describe('Constructs asset listing query model', function() {
   it('Constructs with query params', function(done) {
       var req = {headers:[], query:{}};
       var data = [{vid: "haier", did: "ILR001"}, {vid: "vestfrost", did: "V001"}];
       req.headers["x-access-user"] = "system";
       var queryModel = assetQueryBuilder.buildAssetListingParams(req, data);
       expect(queryModel.offset).to.be.equal(0);
       expect(queryModel.size).to.be.equal(50);
       expect(queryModel.user).to.be.equal("system");
       expect(queryModel.reqId).to.be.an('undefined');
       expect(queryModel.data).to.be.equal("{\"data\":[{\"vid\":\"haier\",\"did\":\"ILR001\"},{\"vid\":\"vestfrost\",\"did\":\"V001\"}]}");
       done();
   });
});

describe('Constructs temperature data query model for asset listings', function() {
   it('Constructs for query params', function(done) {
       var req = {query: {eid: 1344726, ty: "2,3,5", ws: "1", at:3, awr: 1, dur:15,}, headers:[]};
       var queryModel = assetQueryBuilder.buildTempDataParams(req);
       expect(queryModel.url, "kiosk.1344726/devices&typ=2,3,5&ws=0&aType=3&dur:15&awr=1&page=1&size=50");
       expect(queryModel.reqId).to.be.an('undefined');
       expect(queryModel.auth).not.to.be.an('undefined');
       expect(queryModel.url).not.to.contains("mType");
       done();
   });
});

