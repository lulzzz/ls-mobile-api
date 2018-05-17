/**
 * Created by smriti on 17/05/18.
 */

(function(intentResBuilder) {

    intentResBuilder.buildIntentResponse = function(data) {
        var response = {};
        /*console.log("parameters: " + JSON.stringify(data.result.parameters));
        console.log("fulfillment: " + JSON.stringify(data.result.fulfillment));*/
        response.fulfillment = data.result.fulfillment;
        response.parameters = data.result.parameters;
        return response;
    }
})(module.exports);
