'use strict';

var auth  = require('./auth.js');
var logger = require('../.././lib/utils/log');

module.exports = function (req, res, next) {

    var url = req.url;
    //check whether request is for login or other api
    var authRequired = auth.authRequired(url);
    if (authRequired) {
        auth.validateUser(req, res, function(err,data){
            if (err) {
                err.status= 401;
                err.message ={
                    "status": 401,
                    "message": "Invalid Token or Key"
                };
                next(err);
            }
            if (data) {
                debugger
                auth.addReqIdentifier(req, data);
                next();
            }
        });
    } else {
        next();
    }
}
