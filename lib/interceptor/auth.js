'use strict';

var uuid  = require('uuid');
var tokenvalidator = require('./../restclient/tokenvalidator.js');

var auth = {
    authRequired: function (url) {
       if (url && typeof url == 'string') {
           if (url.indexOf('/auth') != -1) {
               return false;
           } else {
               return true;
           }
       }
    },
    addReqIdentifier: function (req, data) {
        debugger
        const id = uuid();
        req.headers['X-request-id'] = id;
        req.headers['x-access-user'] = data;
    },

    validateUser: function (req, res, callback) {
        const cred = req.headers['x-access-token'];
        if (null == cred) {
            throw Error("Unauthorised access");
        }
        tokenvalidator.validatetoken(cred, callback);
    }
}
module.exports = auth;
