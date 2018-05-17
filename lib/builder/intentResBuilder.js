/**
 * Created by smriti on 17/05/18.
 */

(function(intentResBuilder) {

    intentResBuilder.buildIntentResponse = function(data) {
        var response = {};
        response.fulfillment = data.result.fulfillment;
        response.parameters = data.result.parameters;
        return response;
    }
})(module.exports);
