/**
 * Created by yuvaraj on 14/02/18.
 */

'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    reportService = require(path.resolve('./lib/restclient/reports/reportService', '')),
    commonUtils = require(path.resolve('./lib/utils/common/common-utils', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/report', function (req, res) {
    console.log('came in');
    return new Promise(function (resolve, reject) {
        try {
            validate(req);
        } catch (exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        reportService.getReport(req, function (err, data) {
            if (err) {
                logger.error('Error in getting consumption report: ' + err.message);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
});

function validate(req) {
    if (commonUtils.checkNull(req.query.periodicity)) {
        commonUtils.generateValidationError("Periodicity is required.");
    }
    if (commonUtils.checkNull(req.query.duration)) {
        commonUtils.generateValidationError("Duration is required.");
    }
    if (commonUtils.checkNull(req.query.compare)) {
        commonUtils.generateValidationError("Compare is required.");
    }
    if (commonUtils.checkNull(req.query.report_type)) {
        commonUtils.generateValidationError("Report type is required.");
    }
    if (commonUtils.checkNull(req.query.trend_type)) {
        commonUtils.generateValidationError("Trend type is required.");
    }
}

module.exports = router.getRouter();
