'use strict';

(function (common_utils) {

    var path = require('path'),
        GatewayError = require(path.resolve('./lib/error/gatewayerror','')),
        logger = require(path.resolve('./lib/utils/logger', ''));

    common_utils.checkNotNullEmpty = function (argument) {
        return typeof argument !== 'undefined' && argument != null && argument !== "";
    };
    common_utils.checkNullEmpty = function (argument) {
        return !this.checkNotNullEmpty(argument);
    };
    common_utils.checkNotNull = function (argument) {
        return typeof argument !== 'undefined' && argument != null;
    };
    common_utils.checkNull = function (argument) {
        return !this.checkNotNull(argument);
    };

    common_utils.checkIsObject = function (argument){
        if((typeof argument == 'object')){
            return true;
        }
        return false;
    };

    common_utils.toCSV = function(data) {
        var csv = "";
      if(this.checkNotNullEmpty(data)) {
          data.forEach(function(str) {
              if(csv != "") {
                  csv = csv + ",";
              }
              csv = csv + str;
          });
      }
        return csv;
    };
    common_utils.addSingleQuote = function (str) {
        var ret;
        if (this.checkNotNullEmpty(str)) {
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
        return (this.checkNotNullEmpty(object) ? Object.keys(object).length : 0) == 0;
    };

    common_utils.checkNotNullEmptyArray = function(object) {
        return (this.checkNotNull(object) && object.length > 0);
    };

})(module.exports);
