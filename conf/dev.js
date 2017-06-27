'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    assetConfig = require('./assetConfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./approvalConfig'),
    conversationConfig = require('./conversationConfig');

module.exports = {
    baseurl: 'http://localhost:8080/s2/api',
    tempurl: 'http://localhost:9000',
    approvalUrl: 'http://localhost:6400',
    sectokenconfig: {
        url: '/mauth/validate-token',
        method: 'POST',
        timeout: 1000
    },
    amsUser: 'logistimo_admin',
    amsPwd: 'Cl3anAg3nt',
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    userdeviceconfig: userdeviceconfig,
    assetConfig: assetConfig,
    approvalConfig: approvalConfig,
    conversationConfig: conversationConfig
};
