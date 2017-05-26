'use strict';
var authconfig = require('./authconfig');
var dashbrdconfig = require('./dashbrdconfig');
var searchconfig = require('./searchconfig');
var assetConfig = require('./assetConfig');
var userdeviceconfig = require('./userdeviceconfig');

module.exports = {
    baseurl: 'http://localhost:8080/s2/api',
    tempurl: 'http://localhost:9000',
    sectokenconfig: {
        url: '/m/auth/validatetoken',
        method: 'POST',
        timeout: 1000
    },
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    userdeviceconfig: userdeviceconfig,
    assetConfig: assetConfig
};
