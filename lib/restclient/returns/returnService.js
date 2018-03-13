/**
 * Created by yuvaraj on 12/03/18.
 */

(function (returnService) {
    
    "use strict";
    
    var path = require('path'),
        config = require(path.resolve('./conf', '')),
        restClient = require(path.resolve('./lib/restclient/restclient', ''));
    
    
    returnService.createReturns = function (q, callback) {
        var options = constructRequest(q,"create");
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

    returnService.updateReturn = function (q, callback) {
        var options = constructRequest(q,"update");
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

    returnService.getReturn = function (q, callback) {
        var options = constructRequest(q,"get");
        //here call to logistimo api for inventory stock view
        restClient.callApi(options, callback);
    };

    function constructRequest(req,type) {
        var url,method;
        if(type == "create"){
            url = config.baseurl + config.returnsConfig.create_returns.url;
            method = config.returnsConfig.create_returns.method;
        }else if (type == "update"){
            url = config.baseurl + config.returnsConfig.update_return.url +req.params.return_id + '/' + req.params.status;
            method = config.returnsConfig.update_return.method;
        }else{
            url = config.baseurl + config.returnsConfig.get_return.url +req.params.return_id;
            method = config.returnsConfig.get_return.method;
        }
        return {
            url: url,
            method: method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': req.headers['x-access-user'],
                'x-request-id': req.headers['x-request-id']
            },
            body: JSON.stringify(req.body),
            timedOut: config.returnsConfig.create_returns.timeout,
            time: true
        };
    }
    
})(module.exports);