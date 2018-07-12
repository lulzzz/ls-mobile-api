'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder','')),
    utils = require(path.resolve('./lib/utils/common/common-utils','')),
    authService = require(path.resolve('./lib/restclient/auth/authService','')),
    authQueryBuilder = require(path.resolve('./lib/builder/authQueryBuilder','')),
    validator = require(path.resolve('./lib/validator/authRequestValidator',''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

/**
 * This method is used for user's login
 * @deprecated
 */

router.post('/auth/login', function (req, res) {
    return new Promise(function (resolve, reject) {
        processLoginRequest(req, res, true).then(function(data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    });

});

router.post('/auth/generate-otp', function (req) {

    return new Promise(function(resolve, reject) {
        if (typeof !(req.body == 'undefined') && typeof !(req.body.user == 'undefined')) {
            var unm = req.body.user;
            const xforward = req.headers['x-real-ip'];
            authService.generateOtp(unm, xforward, function (err, body) {
                if (err) {
                    logger.error("Error in otp generation for user ", unm);
                    reject(err);
                } else {
                    if(body.isError) {
                        reject({status: 404, message: body.errorMsg});
                    } else {
                        resolve({message: "OTP generated successfully"});
                    }
                }
            });
        } else {
            reject({status: 400, message: "Bad request"});
        }
    });
});

router.post('/auth/reset-password', function (req) {

    return new Promise(function(resolve, reject) {
        if ((typeof !(req.body == 'undefined'))
            && (utils.checkNotNullEmpty(req.body.uid)
            && utils.checkNotNullEmpty(req.body.npd)
            && utils.checkNotNullEmpty(req.body.otp))) {

            var unm = req.body.uid,
                pwd = req.body.npd,
                token = req.body.otp;
            const xforward = req.headers['x-real-ip'];

            authService.resetPassword(unm, pwd, token, xforward, function (err) {
                if (err) {
                    logger.error("Error in reset password for user ", unm);
                    reject(err);
                } else {
                    resolve({message: "Password reset successfully"});
                }
            });
        } else {
            reject({status: 400, message: "Bad request"});
        }
    });
});

/**
 * This method is used for user's login along with two factor authentication
 */
router.post('/auth/login/v1', function (request, response) {
    return new Promise(function (resolve, reject) {
        processLoginRequest(request, response, false).then(function(data) {
            if(utils.checkNullEmpty(data.id)) {
                resolve({"mobile_no": data.mobileNo});
            } else {
                resolve(data);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
});

router.post('/auth/generate-authentication-otp', function (req, res) {
    return new Promise(function (resolve, reject) {
        try {
            validator.validate2FAOTPGenerationRequest(req);
        } catch (exception) {
            logger.warn("Error while validating the regenarte OTP request for user " + req.body.user_id + "\n" + exception);
            reject(exception);
            return;
        }
        authService.process2FAOTPGenerationRequest(req, function (err, data) {
            if (err) {
                logger.warn("Error while regenerating authentication otp for user: {0}", req.body.user_id, err);
                reject(err);
            } else {
                logger.info("OTP regenerated successfully");
                data.message = data.errorMsg;
                data.is_error = data.isError;
                delete data.errorMsg;
                delete data.ec;
                resolve(data);
            }
        });
    });
});

function processLoginRequest(req, res, isOldRequest) {
    return new Promise(function (resolve, reject) {
        var authModel = authQueryBuilder.buildQueryModel(req, isOldRequest);
        try {
            validator.validateLoginRequest(authModel);
        } catch (exception) {
            logger.warn("Error while validating the authentication request: " + exception);
            reject(exception);
            return;
        }
        authService.login(authModel, res, function (err, body) {
            if (err) {
                logger.warn("Error in login for user:{0} ", authModel.username, err);
                reject({status: 401, message: err.message});
            } else {
                resolve(utils.updateTimezone(body));
            }
        });
    });
}


module.exports = router.getRouter();
