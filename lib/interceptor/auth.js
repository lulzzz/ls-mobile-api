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
    },
    addUserIdToken : function (req) {
        const cred  =  req.headers['authorization'];
        var tmp = cred.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
        var plain_auth = buf.toString();        // read it back out as a string
        // At this point plain_auth = "username:password"
        var creds = plain_auth.split(':');      // split on a ':'
        var username = creds[0];
        req.headers['x-access-user'] = username;
    }
}
module.exports = auth;
