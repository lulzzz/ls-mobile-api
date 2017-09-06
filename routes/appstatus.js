/**
 * Created by smriti on 05/09/17.
 */


var path = require('path'),
    config = require(path.resolve('./conf')),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    fs = require('fs'),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', ''));

router.use(function (req, res, next) {
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/app-status', function () {
    return new Promise(function (resolve, reject) {
        if (fs.existsSync(config.statusFilePath)) {
            resolve('OK');
        } else {
            reject({status: 503, message: "Service Unavailable"});
        }
    });
});
module.exports = router.getRouter();

