/**
 * Created by yuvaraj on 26/05/17.
 */
(function (userDeviceQueryBuilder) {
    "use strict";

    var path = require('path'),
        model = require(path.resolve('./model/UserDeviceModel',''));

    userDeviceQueryBuilder.buildAddEditParams = function (req) {
        var queryModel = new model();
        queryModel.userid = req.query.userid;
        queryModel.token = req.query.token;
        queryModel.appname = req.query.appname;
        queryModel.createdOn = req.query.createdOn;
        queryModel.updatedOn = req.query.updatedOn;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    };

    userDeviceQueryBuilder.buildGetTokenParams = function (req) {
        var queryModel = new model();
        queryModel.userid = req.query.userid;
        queryModel.token = req.query.token;
        queryModel.appname = req.query.appname;
        queryModel.createdOn = req.query.createdOn;
        queryModel.updatedOn = req.query.updatedOn;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        queryModel.ip = req.header('x-real-ip');
        return queryModel;
    };
})(module.exports);