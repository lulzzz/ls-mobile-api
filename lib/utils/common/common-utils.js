'use strict';

(function (common_utils) {
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
    }
})(module.exports);
