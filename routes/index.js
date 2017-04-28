'use strict';

var router = require('express').Router();
var logger = require('../lib/utils/log');

router.use(function(req, res, next){
  debugger
  logger.info("Main route executing for req url:"+req.url);
  //calling middleware
  return next();
});

router.use('/auth/*',require('./auth'));
router.use('/dashboards/*',require('./dashboard'));
router.use('/inventory',require('./inventory'));
router.use('/assets',require('./assets'));
router.use('/events',require('./events'));

//routes common error handler
router.use(function(err, req, res, next){
  logger.error("error occurred :"+err.message);
  //calling next error handler
  return next(err);
});
module.exports = router;
