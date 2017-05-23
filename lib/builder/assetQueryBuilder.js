/**
 * Created by smriti on 17/05/17.
 */

(function(assetQueryBuilder) {
    "use strict";
    //assetQueryModel = require('../model/AssetQueryModel')
    var model = require('../../model/AssetQueryModel');
    assetQueryBuilder.buildTempDataParams = function(req, res) {
        var queryModel = new model();
        if(req.query.eid) {
            queryModel.eid = req.params.eid;
        }
        if(req.query.did) {
            queryModel.dId = req.query.did;
            queryModel.url += queryModel.dId + "/devices?";
        }
        if(req.query.ty) {
            queryModel.at = req.query.ty;
            queryModel.url += "&typ=" + queryModel.at;
        }
        if(req.query.ws) {
            queryModel.ws = req.query.ws;
            queryModel.url += "&ws=" + queryModel.ws;
        }
        if(req.query.at) {
            queryModel.at = req.query.at;
            queryModel.url += "&aType=" + queryModel.at;
        }
        if(req.query.dur) {
            queryModel.dur = req.query.dur;
            queryModel.url += "&dur=" + queryModel.dur;
        }
        if(req.query.awr) {
            queryModel.awr = req.query.awr;
            queryModel.url += "&awr=" + queryModel.awr;
        }
        queryModel.size = req.query.sz ? req.query.sz : 50;
        var offset = req.query.o ? req.query.o : 0;
        queryModel.page = (parseInt(offset) / parseInt(queryModel.size)) + 1;
        queryModel.url += "&page=" + queryModel.page + "&size=" + queryModel.size;
        queryModel.auth = req.header("authorization");
        queryModel.reqId = req.header("x-request-id");
        return queryModel;
    };

    assetQueryBuilder.buildAssetListingParams = function(req, data) {
        var queryModel = new model();
        queryModel.offset = req.query.o;
        queryModel.size = req.query.sz;
        queryModel.data = JSON.stringify(data);
        queryModel.reqId = req.header("x-request-id");
        queryModel.user = req.header("x-access-user");
        return queryModel;
    };
})
(module.exports);
