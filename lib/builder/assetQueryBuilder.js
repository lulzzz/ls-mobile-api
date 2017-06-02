/**
 * Created by smriti on 17/05/17.
 */

(function (assetQueryBuilder) {
    "use strict";
    var path = require('path'),
        model = require(path.resolve('./model/AssetQueryModel', '')),
        constants = require(path.resolve('./constants/constants'));

    assetQueryBuilder.buildTempDataParams = function (req) {
        var queryModel = new model();
        if (req.query.eid) {
            queryModel.eid = req.params.eid;
        }
        if (req.query.did) {
            queryModel.dId = req.query.did;
            queryModel.url += queryModel.dId + "/devices?";
        }
        if (req.query.ty) {
            queryModel.at = req.query.ty;
            queryModel.url += "&typ=" + queryModel.at;
        }
        if (req.query.ws) {
            queryModel.ws = req.query.ws;
            queryModel.url += "&ws=" + (parseInt(queryModel.ws) - 1);
        }
        if (req.query.at) {
            queryModel.alrmType = req.query.at;
            queryModel.url += "&aType=" + queryModel.alrmType;
        }
        if (req.query.dur) {
            queryModel.dur = req.query.dur;
            queryModel.url += "&dur=" + queryModel.dur;
        }
        if (req.query.awr) {
            queryModel.awr = req.query.awr;
            queryModel.url += "&awr=" + queryModel.awr;
        }
        queryModel.size = req.query.sz ? parseInt(req.query.sz) : constants.const.SIZE;
        var offset = req.query.of ? parseInt(req.query.of) : constants.const.OFFSET;
        queryModel.page = parseInt((offset / queryModel.size).toFixed(1)) + 1;
        queryModel.url += "&page=" + queryModel.page + "&size=" + queryModel.size;
        queryModel.auth = req.header("authorization");
        queryModel.reqId = req.header("x-request-id");
        return queryModel;
    };

    assetQueryBuilder.buildAssetListingParams = function (req, data) {
        var queryModel = new model();
        queryModel.offset = req.query.of ? req.query.of : constants.const.OFFSET;
        queryModel.size = req.query.sz ? req.query.sz : constants.const.SIZE;
        queryModel.data = JSON.stringify({data: data});
        queryModel.reqId = req.header("x-request-id");
        queryModel.user = req.header("x-access-user");
        return queryModel;
    };

    assetQueryBuilder.buildTempAlertParams = function (req) {
        var queryModel = new model();
        queryModel.vid = req.query.vid;
        queryModel.did = req.query.did;
        queryModel.mpid = req.query.mpid;
        queryModel.sint = req.query.sint;
        queryModel.ty = req.query.ty; // Monitored or monitoring
        queryModel.sd = req.query.sd;
        queryModel.ed = req.query.ed;
        queryModel.page = req.query.pg ? req.query.pg : constants.const.PAGE;
        queryModel.size = req.query.sz ? req.query.sz : constants.const.SIZE;
        queryModel.token = req.header("x-access-token");
        queryModel.reqId = req.header("x-request-id");
        queryModel.url = queryModel.vid + "/" + queryModel.did + "/" + queryModel.mpid;
        queryModel.auth = req.header("authorization");
        if (queryModel.sd > 0 && queryModel.ed > 0) {
            queryModel.url += "/" + queryModel.sd + "/" + queryModel.ed;
        }
        queryModel.url += "?page=" + queryModel.page + "&size=" + queryModel.size;
        return queryModel;
    };
})
(module.exports);
