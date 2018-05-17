'use strict';

var router = require('express').Router();
var logger = require('../lib/utils/logger');

router.use('/auth/*', require('./auth'));
router.use('/dashboards/*', require('./dashboard'));
router.use('/inventory*', require('./inventory'));
router.use('/search*', require('./search'));
router.use('/assets', require('./assets'));
router.use('/event-summaries*', require('./events'));
router.use('/user-device/*', require('./userdevice'));
router.use('/order-approvals*',require('./approvals'));
router.use('/conversations*',require('./conversations'));
router.use('/metrics*', require('./metrics'));
router.use('/app-status', require('./appstatus'));
router.use('/media',require('./media'));
router.use('/collaboration*',require('./collaboration'));
router.use('/configurations*', require('./configuration'));
router.use('/intents', require('./intents'));


//routes common error handler
router.use(function (err, req, res, next) {
    logger.error("Error occurred :" + err.message);
    //calling next error handler
    return next(err);
});
module.exports = router;
