'use strict';
var authconfig = require('./authconfig');
var dashbrdconfig = require('./dashbrdconfig');

module.exports = {
    baseurl: 'http://localhost:8080/s2/api',
    sectokenconfig : {
        url:'/m/auth/validatetoken',
        method:'POST',
        timeout:1000
    },
    loginconfig: authconfig,
    dashconfig: dashbrdconfig,
    searchconfig: searchconfig
};
