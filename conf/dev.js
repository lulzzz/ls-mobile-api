'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    assetConfig = require('./assetConfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./approvalConfig'),
    conversationConfig = require('./conversationConfig'),
    eventsConfig = require('./eventsConfig');;

module.exports = {
    baseurl: 'http://localhost:8080/s2/api',
    tempurl: 'http://localhost:9000',
    eventsUrl: 'http://localhost:9010/v1/event-summaries',
    sectokenconfig: {
        url: '/mauth/validate-token',
        method: 'POST',
        timeout: 30000
    },
    amsUser: 'logistimo',
    amsPwd: 'logistimo',
    maxSockets: 25,
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    userdeviceconfig: userdeviceconfig,
    assetConfig: assetConfig,
    approvalConfig: approvalConfig,
    conversationConfig: conversationConfig,
    eventsConfig: eventsConfig
};
