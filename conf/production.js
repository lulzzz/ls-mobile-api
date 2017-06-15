'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./approvalConfig'),
    ordersConfig = require('./ordersConfig'),
    conversationConfig = require('./conversationConfig');

module.exports = {
    baseurl: 'http://<statging-host>:<statging-port>/s2/api',
    tempurl: 'http://<statging-host>:<statging-port>/v2',
    approvalUrl: 'http://<statging-host>:<statging-port>',
    sectokenconfig: {
        url: '/m/auth/validatetoken',
        method: 'GET',
        timeout: 1000
    },
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    userdeviceconfig: userdeviceconfig,
    assetConfig: assetConfig,
    approvalConfig: approvalConfig,
    ordersConfig: ordersConfig,
    conversationConfig: conversationConfig
};
