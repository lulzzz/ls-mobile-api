'use strict';

var auth = require('./auth.js'),
    path = require('path'),
    logger = require(path.resolve('./lib/utils/log', '')),
    metrics = require(path.resolve('./lib/metrics', ''));

module.exports = function (req, res, next) {

    var url = req.url,
    //check whether request is for login or other api
    authRequired = auth.authRequired(url);
    if (authRequired) {
        auth.validateUser(req, res, function (err, data) {
            if (err) {
                err.status = 401;
                err.message = {
                    "status": 401,
                    "message": err.message
                };
                metrics.incrementCounter(req.method, err.status, "/");
                next(err);
            }
            if (data) {
                auth.addReqIdentifier(req, data);
                next();
            }
        });
    } else {
        next();
    }
};
