//function to get dashboard inventory
(function (dashinv) {
    "use strict";

    const request = require('request');
    dashinv.getInvDashboard = function(q,req,res,callback) {
        var options = {
            url: 'http://localhost:8080/s2/api/m/dashboards/inventory',
            method: 'GET',
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json'
            },
            qs: {
                dId:q.dId,
                incetags:q.incetags,
                exeetags:q.exeetags,
                mtags:q.mtags,
                mnm:q.mnm,
                loc:q.loc,
                locty:q.locty,
                p:q.p,
                date:q.date,
                refresh:q.refresh
            },
            timedOut: 1000
        };
        //here call to logistimo api for login
        var status;
        request(options, function (err, response, body) {
            status = response.statusCode;
            if (err) {
                callback(new Error(err.message),null);
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
