/**
 * Created by charan on 11/07/17.
 */

'use strict';

var router = require('express').Router(),
    path = require('path'),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    metrics = require(path.resolve('./lib/metrics', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/metrics', function (req, res, next) {
    res.end(metrics.getMetrics())
});

module.exports = router;
