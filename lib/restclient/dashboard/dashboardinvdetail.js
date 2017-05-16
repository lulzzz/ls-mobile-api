//function to get dashboard inventory
(function (dashinvdetail) {

    "use strict";

    const request = require('request');
    const config = require('../../../conf');
    const restclient = require('../restclient');

    dashinvdetail.getInvDetailDashboard = function(q,req,res,callback) {
        var options = {
            url: config.baseurl+config.dashconfig.dash_invdetail.url,
            method: config.dashconfig.dash_invdetail.method,
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
                groupby:q.groupby,
                refresh:q.refresh
            },
            timedOut: config.dashconfig.dash_invdetail.timeout
        };
        //here call to logistimo api for dashboard inv detail api
        restclient.callApi(options,callback);
    }

})(module.exports);
