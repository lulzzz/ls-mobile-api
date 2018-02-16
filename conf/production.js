'use strict';
var authconfig = require('./authconfig'),
    dashbrdconfig = require('./dashbrdconfig'),
    searchconfig = require('./searchconfig'),
    userdeviceconfig = require('./userdeviceconfig'),
    approvalConfig = require('./approvalConfig'),
    conversationConfig = require('./conversationConfig'),
    eventsConfig = require('./eventsConfig'),
    mediaConfig = require('./mediaConfig'),
    domainConfig = require('./domainConfig'),
    collaborationConfig = require('./collaborationConfig'),
    assetConfig = require('./assetConfig'),
    reportsConfig = require('./reportsConfig');

module.exports = {
    baseurl: 'http://<staging-host>:<staging-port>/s2/api',
    tempurl: 'http://<staging-host>:<staging-port>',
    mediaurl: 'http://<staging-host>:<staging-port>/_ah/api/mediaendpoint',
    eventsUrl: 'http://<staging-host>:<staging-port>/v1/event-summaries',
    collaborationServiceUrl: 'http://<staging-host>:<staging-port>/v1/collaboration',
    sectokenconfig: {
        url: '/mauth/validate-token',
        method: 'GET',
        timeout: 1000
    },
    validateDomainConfig: {
        url: '',
        method: 'GET',
        timeout: 1000
    },
    maxSockets: 25,
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig,
    userdeviceconfig: userdeviceconfig,
    assetConfig: assetConfig,
    approvalConfig: approvalConfig,
    conversationConfig: conversationConfig,
    eventsConfig: eventsConfig,
    statusFilePath: '',
    mediaConfig: mediaConfig,
    domainConfig: domainConfig,
    collaborationConfig: collaborationConfig,
    reportsConfig:reportsConfig
};
