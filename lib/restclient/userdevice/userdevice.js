/**
 * Created by yuvaraj on 24/05/17.
 */
(function (userdevice) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    userdevice.addEditUserDevice = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.userdeviceconfig.userDevice_addEdit.url,
            method: config.userdeviceconfig.userDevice_addEdit.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            body: JSON.stringify(req.body),
            timedOut: config.userdeviceconfig.userDevice_addEdit.timeout
        };
        //here call to logistimo api for dashboard inv api
        restclient.callApi(options,callback);
    }

    userdevice.getUDToken = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.userdeviceconfig.userDevice_getToken.url,
            method: config.userdeviceconfig.userDevice_getToken.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
            },
            qs: {
                userId:q.userid,
                appName:q.appname,
            },
            timedOut: config.userdeviceconfig.userDevice_getToken.timeout
        };
        //here call to logistimo api for dashboard inv api
        restclient.callApi(options,callback);
    }

})(module.exports);