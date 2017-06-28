'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./searchconfig'),
    conversationConfig = require('./conversationConfig');

module.exports = {
    baseurl: 'http://<statging-host>:<statging-port>/s2/api',
    tempurl: 'http://<statging-host>:<statging-port>/v2',
    sectokenconfig: {
        url: '/mauth/validate-token',
        method: 'GET',
        timeout: 1000
    },
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    assetConfig: assetConfig,
    userdeviceconfig: userdeviceconfig,
    approvalConfig: approvalConfig,
    conversationConfig: conversationConfig
};
