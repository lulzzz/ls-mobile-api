'use strict';
var authconfig = require('./authconfig');
var dashbrdconfig = require('./dashbrdconfig');
var searchconfig = require('./searchconfig');

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
    searchconfig: searchconfig
};
