var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe ('test assets', function () {

    var requeststub, restclientstub, dashboardservicestub;
    beforeEach(function () {

        'use strict';
        requeststub = sinon.stub();
        restclientstub = proxyquire('../../lib/restclient/restclient',{'request':requeststub});
        dashboardservicestub = proxyquire('../../lib/restclient/dashboard/dashboardService',{'restclient':restclientstub});
    });

    it('should return 200', function () {

        console.log
    })
});
