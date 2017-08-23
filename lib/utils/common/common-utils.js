'use strict';

(function (common_utils) {

    var path = require('path'),
        GatewayError = require(path.resolve('./lib/error/gatewayerror',''));

    common_utils.checkNotNullEmpty = function (argument) {
        return typeof argument !== 'undefined' && argument != null && argument != "";
    };
    common_utils.checkStrictNotNullEmpty = function(argument) {
        return typeof argument !== 'undefined' && argument != null && argument !== "";
    };
    common_utils.checkNullEmpty = function (argument) {
        return !common_utils.checkNotNullEmpty(argument);
    };
    common_utils.checkNotNull = function (argument) {
        return typeof argument !== 'undefined' && argument != null;
    };
    common_utils.checkNull = function (argument) {
        return !common_utils.checkNotNull(argument);
    };

    common_utils.checkIsObject = function (argument){
        if((typeof argument == 'object')){
            return true;
        }
    };
    common_utils.addSingleQuote = function (str) {
        var ret;
        if (common_utils.checkNotNullEmpty(str)) {
            ret = '';
            var s = str.split(",");
            if (s.length > 1) {
                s.forEach(function (entry) {
                    ret = ret + "'" + entry + "'";
                    ret = ret + ","
                });
                ret = ret.substring(0, ret.length - 1);
                return ret;
            } else {
                ret = "'" + str + "'";
            }
            return ret;
        }
    };
    common_utils.generateValidationError = function(message) {
        var error = {};
        error.code = 400;
        error.message = 'Bad Request :'+message;
        throw new GatewayError (error,error.code);
    };
    common_utils.checkNullEmptyObject = function(object) {
        return (common_utils.checkNotNullEmpty(object) ? Object.keys(object).length : 0) == 0;
    };

})(module.exports);
