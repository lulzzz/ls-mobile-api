//function to get dashboard inventory
(function (dashast) {
    "use strict";

    const request = require('request');
    dashast.getAssetDashboard = function(callback) {
        var options = {
            url: 'http://localhost:8080/s2/api/m/dashboards/assets',
            method: 'GET',
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            timedOut: 1000
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {
            status = response.statusCode;
            if (err) {
                console.log(err);
            }

            if (status != null && status == 200 || status == 201 && body == true) {
                callback(null,body);
            }
            else {
                callback(new Error("Unauthorised user"),null);;
            }
        });
    }

})(module.exports);
