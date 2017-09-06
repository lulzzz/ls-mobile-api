'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./searchconfig'),
    conversationConfig = require('./conversationConfig'),
    eventsConfig = require('./eventsConfig');

module.exports = {
    baseurl: 'http://<staging-host>:<staging-port>/s2/api',
    tempurl: 'http://<staging-host>:<staging-port>',
    eventsUrl: 'http://<staging-host>:<staging-port>/v1/event-summaries',
    sectokenconfig: {
        url: '/mauth/validate-token',
        method: 'GET',
        timeout: 1000
    },
    maxSockets: 25,
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    assetConfig: assetConfig,
    userdeviceconfig: userdeviceconfig,
    approvalConfig: approvalConfig,
    conversationConfig: conversationConfig,
    eventsConfig: eventsConfig,
    statusFilePath: ''
};
