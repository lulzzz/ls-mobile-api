'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./searchconfig'),
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
    assetConfig: assetConfig,
    userdeviceconfig: userdeviceconfig,
    approvalConfig: approvalConfig,
    ordersConfig: ordersConfig,
    conversationConfig: conversationConfig
};
