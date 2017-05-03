'use strict';

var router = require('express').Router(),
    logger = require('../lib/utils/log'),
    urldecoder = require('../lib/utils/urldecoder');

router.use(function(req, res, next){
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urldecoder.decodeurl(req);
    return next();
});

router.get('/assettemp', function (req, res, next) {



});

module.exports = router;
