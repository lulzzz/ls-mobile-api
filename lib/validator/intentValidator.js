/**
 * Created by smriti on 17/05/18.
 */

(function (intentValidator) {
    var path = require('path'),
        intentModel = require(path.resolve('./model/intentModel.js')),
        constants = require(path.resolve('./lib/constants/constants.js','')),
        utils = require(path.resolve('./lib/utils/common/common-utils.js', '')),
        services = require(path.resolve('./lib/restclient/intents/intentService.js',''));

    intentValidator.validateParameters = function (intentParameters) {
        if (utils.checkNotNullEmpty(intentParameters) && utils.checkNotNullEmptyArray(intentParameters.TransactionType) &&
            utils.checkNotNullEmpty(intentParameters.quantity) && utils.checkNotNullEmpty(intentParameters.material) &&
            utils.checkNotNullEmpty(intentParameters.transactionDate) && utils.checkNotNullEmpty()) {
            if (constants.const.indexOf(intentParameters.transaction_type) < 0) {
                return "Transaction type is invalid. Please provide a correct one."
            }
            return true;
        } else {
            return true;
        }
    };
})(module.exports);