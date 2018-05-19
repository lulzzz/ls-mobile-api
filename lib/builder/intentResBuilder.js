/**
 * Created by smriti on 17/05/18.
 */

(function(intentResBuilder) {
    var path = require('path'),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
        constants = require(path.resolve('./lib/constants/constants.js',''));

    intentResBuilder.buildIntentResponse = function(data) {
        var response = {};
        response.fulfillment = data.result.fulfillment;
        response.parameters = data.result.parameters;
        if(utils.checkNotNullEmpty(response.parameters.Material)) {
            response.parameters.materialId = constants.const.MATERIAL[response.parameters.Material];
        }
        if(utils.checkNotNullEmpty(response.parameters.Name)) {
            response.parameters.kioskid = constants.const.ENTITY[response.parameters.Name];
            console.log(constants.const.ENTITY[response.parameters.Name]);
            console.log("kid: "+ response.parameters.kioskid);
        }
        return response;
    }
})(module.exports);
