'use strict';

var uuid = require('uuid'),
    path = require('path'),
    tokenValidator = require(path.resolve('./lib/restclient/tokenvalidator', ''));

var auth = {
    authRequired: function (url) {
        if (url && typeof url == 'string') {
            return !(url.indexOf('/auth') != -1) && !(url.indexOf('/metrics') != -1)
                && !(url.indexOf('/app-status') != -1);
            /*if (url.indexOf('/auth') != -1) {
             return false;
             } else {
             return true;
             }*/
        }
    },
    addReqIdentifier: function (req, data) {
        req.headers['x-request-id'] = uuid();
        req.headers['x-real-ip'] = req.headers['X-REAL-IP'];
        req.headers['x-access-user'] = data;
    },

    validateUser: function (req, res, callback) {
        const cred = req.headers['x-access-token'];
        const srcInitiator = req.headers['x-access-initiator'];
        if (null == cred) {
            callback(Error("Unauthorised access"));
        } else {
            tokenValidator.validateToken(cred, srcInitiator, callback);
        }
    },
    addUserIdToken: function (req) {
        const cred = req.headers['authorization'];
        var tmp = cred.split(' '),   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
            buf = new Buffer(tmp[1], 'base64'), // create a buffer and tell it the data coming in is base64
            plain_auth = buf.toString(),        // read it back out as a string
        // At this point plain_auth = "username:password"
            creds = plain_auth.split(':'),      // split on a ':'
            username = creds[0];
        req.headers['x-access-user'] = username;
    }
}
module.exports = auth;
