//function to validate otp
(function (resetpwd) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    resetpwd.resetPassword = function(userid, newpwd, otp, callback) {
        var options = {
            url: config.baseurl+config.loginconfig.resetpassword.url,
            method: config.loginconfig.resetpassword.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            body: {'uid':userid,'npd':newpwd,'otp':otp},
            json:true,
            timedOut: config.loginconfig.resetpassword.timeout
        };
        //calling
        restclient.callApi(options,callback);
    }

})(module.exports);
