/**
 * Created by yuvaraj on 24/05/17.
 */
(function (userdevice) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    userdevice.createUserDevice = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.userdeviceconfig.userDevice_create.url,
            method: config.userdeviceconfig.userDevice_create.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user
            },
            body: JSON.stringify(req.body),
            timedOut: config.userdeviceconfig.userDevice_create.timeout
        };
        //here call to logistimo api for dashboard inv api
        restclient.callApi(options,callback);
    }

    userdevice.updateUserDevice = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.userdeviceconfig.userDevice_update.url,
            method: config.userdeviceconfig.userDevice_create.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user
            },
            body: JSON.stringify(req.body),
            qs: {
                userid:q.userid,
                appname:q.appname
            },
            timedOut: config.userdeviceconfig.userDevice_create.timeout
        };
        //here call to logistimo api for dashboard inv api
        restclient.callApi(options,callback);
    }

})(module.exports);