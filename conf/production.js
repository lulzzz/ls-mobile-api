'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    assetConfig = require('./assetConfig'),
    approvalConfig = require('./approvalConfig');

module.exports = {
    baseurl: 'http://<statging-host>:<statging-port>/s2/api',
    tempurl: 'http://<statging-host>:<statging-port>/v2',
    sectokenconfig : {
        url:'/m/auth/validatetoken',
        method:'GET',
        timeout:1000
    },
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    assetConfig: assetConfig,
    approvalConfig: approvalConfig
};
