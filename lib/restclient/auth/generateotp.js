//function to generate otp
(function (generateotp) {
    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    generateotp.generateOtp = function(userid, callback) {
        var options = {
            url: config.baseurl+config.loginconfig.generateotp.url,
            method: config.loginconfig.generateotp.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            body: userid,
            timedOut: config.loginconfig.generateotp.timeout
        };
        //calling logistimo generateotp api
        restclient.callApi(options,callback);
    }

})(module.exports);
