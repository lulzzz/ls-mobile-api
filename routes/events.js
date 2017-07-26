'use strict';

var router = require('express').Router();
var logger = require('../lib/utils/logger');

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    if (req.url === '/') {
        req.url = req.originalUrl;
    }
    return next();
});

router.get('/events', function (req, res, next) {


});

module.exports = router;
