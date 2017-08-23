/**
 * Created by smriti on 18/08/17.
 */

var path = require('path');
    dashboardBuilder = require(path.resolve('./lib/builder/dashboardResBuilder.js','')),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    expect = require('chai').expect;

describe('sort data test', function () {

    it('sort data', function (done) {
        var abc = dashboardBuilder.sortData([{mnm:"BCG dose",nc:50,tc:100},{mnm:"Syringes",nc:100,tc:100}],'nc');
        expect(abc[0].mnm="Syringes");
        expect(abc[1].mnm="BCG dose");
        done();

    });

    it('sort data for an empty object', function (done) {
        var abc = [];
        expect(abc.length = 0);
        done();
    });

    it('sort data for district level', function (done) {
        var data = dashboardBuilder.sortData([{enm:"Lucknow DVS",nc:50,tc:100},{enm:"Rajasthan DVS",nc:100,tc:100},{enm:"Assam DVS",nc:100,tc:100}],'nc');
        expect(data[0].enm="Assam DVS");
        expect(data[1].enm="Rajasthan DVS");
        expect(data[2].enm="Lucknow DVS");
        done();
    })
});