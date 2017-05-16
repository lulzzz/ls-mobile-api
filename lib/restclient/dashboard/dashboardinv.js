//function to get dashboard inventory
(function (dashinv) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    dashinv.getInvDashboard = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.dash_inv.url,
            method: config.dashconfig.dash_inv.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type':'application/json',
                'x-access-user': q.user,
                'x-request-id': q.reqId
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
            timedOut: config.dashconfig.dash_inv.timeout
        };
        //here call to logistimo api for dashboard inv api
        restclient.callApi(options,callback);
    }

})(module.exports);
