/**
 * Created by smriti on 18/08/17.
 */

var path = require('path');
dashboardBuilder = require(path.resolve('./lib/builder/dashboardResBuilder.js', '')),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    expect = require('chai').expect;

describe('sort data test', function () {

    it('sort data', function (done) {
        var abc = dashboardBuilder.sortData([{mnm: "BCG dose", nc: 50, tc: 100}, {
            mnm: "Syringes",
            nc: 100,
            tc: 100
        }], 'nc');
        expect(abc[0].mnm).to.be.equal("BCG dose");
        expect(abc[1].mnm).to.be.equal("Syringes");
        done();

    });

    it('sort data for an empty object', function (done) {
        var abc = [];
        expect(abc.length).to.be.equal(0);
        done();
    });

    it('sort data for district level', function (done) {
        var data = dashboardBuilder.sortData([{enm: "Lucknow DVS", nc: 50, tc: 100}, {
            enm: "Rajasthan DVS",
            nc: 100,
            tc: 100
        }, {enm: "Assam DVS", nc: 100, tc: 100}], 'nc');
        expect(data[0].enm).to.be.equal("Lucknow DVS");
        expect(data[1].enm).to.be.equal("Rajasthan DVS");
        expect(data[2].enm).to.be.equal("Assam DVS");
        done();
    });
});

describe('buildActivityDashboard Test', function () {
    it('returns the activity dashboard data', function (done) {
        var data = {mLev:"country",entDomain:{a:2, i:7},ent:{a:{Goa:{value:10,
            per:50,den:20},Assam:{value:15,per:30,den:50}}, i:{Goa:{value:10, per:20, den:50},Assam:{value:20, per: 40, den:50}}}};
        var model = dashboardBuilder.buildActivityDashboard(data);
        expect(model.l = "country");
        expect(model.items["a"][0].lcnm).to.equal("Goa");
        expect(model.items["i"][0].lcnm).to.equal("Assam");
        done();
    });
});