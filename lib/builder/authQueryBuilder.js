/**
 * @author smriti
 */
var path = require('path'),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
    constants = require(path.resolve('./lib/constants/constants', '')),
    md5 = require('md5');

module.exports = {

    buildQueryModel: function (request, skipTwoFactorAuthentication) {
        var authQueryModel = require(path.resolve('./model/authQueryModel', ''));
        authQueryModel = new authQueryModel();
        var credentials = fetchUserCredentials(request);
        authQueryModel.username = credentials[0];
        authQueryModel.password = credentials[1];
        authQueryModel.realIP = request.headers['x-real-ip'];
        authQueryModel.appName = request.headers['x-app-name'];
        authQueryModel.appVersion = request.headers['x-app-ver'];
        authQueryModel.otp = request.body.otp;
        authQueryModel.language = utils.checkNotNullEmpty(request.body.lang) ? request.body.lang : constants.const.DEFAULT_LANGUAGE;
        authQueryModel.skipTwoFactorAuthentication = skipTwoFactorAuthentication;
        var key = "_di" + md5(authQueryModel.username);
        if (!skipTwoFactorAuthentication && utils.checkNotNullEmpty(request.headers[key])) {
            authQueryModel.cookie = key + "=" + request.headers[key] + ";";
        }
        return authQueryModel;
    }
};

function fetchUserCredentials(request) {
    var tmp = request.headers['authorization'].split(' '),   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        buf = new Buffer(tmp[1], 'base64'), // create a buffer and tell it the data coming in is base64
        plain_auth = buf.toString();        // read it back out as a string
    return plain_auth.split(':');     // split on a ':
}
