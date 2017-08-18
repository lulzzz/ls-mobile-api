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
});