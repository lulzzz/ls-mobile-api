'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    assetConfig = require('./assetConfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./approvalConfig');
module.exports = {
    baseurl: 'https://test.logistimo.com/s2/api',
    tempurl: 'https://nts.logistimo.com',
    sectokenconfig : {
        url:'/m/auth/validatetoken',
        method:'POST',
        timeout:1000
    },
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    userdeviceconfig: userdeviceconfig,
    assetConfig: assetConfig,
    approvalConfig: approvalConfig
};
