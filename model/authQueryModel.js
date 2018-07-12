/**
 * @author smriti
 */


function authQueryModel() {
    this.username = undefined;
    this.password = undefined;
    this.realIP = undefined;
    this.appVersion = undefined;
    this.appName = undefined;
    this.otp = undefined;
    this.language = undefined;
    this.skipTwoFactorAuthentication = false;
    this.cookie = undefined;
}

module.exports = authQueryModel;