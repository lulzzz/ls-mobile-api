/**
 * Created by smriti on 18/05/17.
 */

(function (dashboardQueryBuilder) {
    "use strict";

    var path = require('path'),
        utils = require(path.resolve('./lib/utils/common/common-utils',''));

    dashboardQueryBuilder.buildAssetDashboardParams = function (req) {
        var model = require(path.resolve('./model/AssetDashboardQueryModel', '')),
            queryModel = new model();

        queryModel.filter = req.query.locnm;
        queryModel.level = req.query.locty;
        queryModel.aType = req.query.ty;
        queryModel.tPeriod = req.query.p;
        queryModel.excludeETag = req.query.excludeETag;
        queryModel.skipCache = req.query.refresh;
        queryModel.user = req.header('x-access-user');
        queryModel.reqId = req.header('x-request-id');
        return queryModel;
    };

    dashboardQueryBuilder.buildInvDashboardParams = function (req) {
        var model = require(path.resolve('./model/InvDashQueryModel',''));
        var queryModel = new model();
        queryModel.incetags = utils.addSinqleQuote(req.query.incetags);
        queryModel.exetags = utils.addSinqleQuote(req.query.exetags);
        queryModel.mtags = utils.addSinqleQuote(req.query.mtags)
        queryModel.mnm = req.query.mnm;
        queryModel.loc = req.query.loc;
        queryModel.locty = req.query.locty;
        queryModel.p = req.query.p;
        queryModel.date = req.query.date;
        queryModel.refresh = req.query.refresh;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    };

    dashboardQueryBuilder.buildInvDetailDashboardParams = function (req) {
        var model = require(path.resolve('./model/InvDetailQueryModel',''));
        var queryModel = new model();
        queryModel.incetags = utils.addSinqleQuote(req.query.incetags);
        queryModel.exetags = utils.addSinqleQuote(req.query.exetags);
        queryModel.mtags = utils.addSinqleQuote(req.query.mtags);
        queryModel.mnm = req.query.mnm;
        queryModel.loc = req.query.loc;
        queryModel.locty = req.query.locty;
        queryModel.p = req.query.p;
        queryModel.date = req.query.date;
        queryModel.refresh = req.query.refresh;
        queryModel.groupby = req.query.groupby;
        queryModel.user = req.headers['x-access-user'];
        queryModel.reqId = req.headers['x-request-id'];
        return queryModel;
    };
})(module.exports);
