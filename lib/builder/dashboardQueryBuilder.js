/**
 * Created by smriti on 18/05/17.
 */

(function(dashboardQueryBuilder) {
    "use strict";
    var model = require('../../model/assetDashboardQueryModel');

    dashboardQueryBuilder.buildAssetDashboardParams = function(req) {
        var queryModel = new model();
        queryModel.filter = req.query.locnm;
        queryModel.level = req.query.locty;
        queryModel.aType = req.query.ty;
        queryModel.tPeriod = req.query.p;
        queryModel.excludeETag = req.query.excludeETag;
        queryModel.skipCache = req.query.refresh;
        queryModel.size = req.query.size;
        queryModel.offset = req.query.offset;
        queryModel.user = req.header('x-access-user');
        queryModel.reqId = req.header('x-request-id');
        return queryModel;
    }
}) (module.exports);
