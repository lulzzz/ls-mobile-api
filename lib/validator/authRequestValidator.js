/**
 * @author smriti
 */

var path = require('path'),
    utils = require(path.resolve('./lib/utils/common/common-utils', ''));

module.exports = {
    validateLoginRequest: function (req) {
        if (utils.checkNullEmpty(req.username)) {
            utils.generateValidationError("User ID is required");
        } else if (utils.checkNullEmpty(req.password)) {
            utils.generateValidationError("Password is required");
        }
    },

    validate2FAOTPGenerationRequest: function (req) {
        if (utils.checkNullEmpty(req.body.user_id)) {
            utils.generateValidationError("User ID is required");
        }
    }
};
