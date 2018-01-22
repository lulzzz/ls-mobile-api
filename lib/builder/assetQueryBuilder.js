/**
 * Created by smriti on 17/05/17.
 */

(function (assetQueryBuilder) {
    "use strict";
    var path = require('path'),
        model = require(path.resolve('./model/AssetQueryModel', '')),
        constants = require(path.resolve('./lib/constants/constants')),
        config = require(path.resolve('./conf', ''));

    assetQueryBuilder.buildTempDataParams = function (req) {
        var queryModel = new model();
        var tag = req.query.did;
        if (req.query.eid) {
            tag = "kiosk." + req.query.eid;
        }
        queryModel.url += tag + "/devices?";
        if (req.query.ty) {
            queryModel.url += "&typ=" + req.query.ty;
        }
        if (req.query.ws) {
            queryModel.url += "&ws=" + (parseInt(req.query.ws) - 1);
        }
        if (req.query.at) {
            queryModel.url += "&aType=" + req.query.at;
        }
        if (req.query.dur) {
            queryModel.url += "&dur=" + req.query.dur;
        }
        if (req.query.awr) {
            queryModel.url += "&awr=" + req.query.awr;
        }
        var size = req.query.sz ? parseInt(req.query.sz) : constants.const.SIZE;
        var offset = req.query.of ? parseInt(req.query.of) : constants.const.OFFSET;
        var page = parseInt((offset / size).toFixed(1)) + 1;
        queryModel.url += "&page=" + page + "&size=" + size;
        queryModel.auth = 'Basic ' + new Buffer(config.amsUser + ':' + config.amsPwd).toString('base64');
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
        queryModel.did = req.params.asset_id || req.query.did;
        queryModel.mpid = req.query.mpid;
        if(queryModel.vid == undefined || queryModel.did == undefined || queryModel.mpid == undefined) {
            return;
        }
        queryModel.sint = req.query.sint ? req.query.sint : constants.const.SAMPLING_INTERVAL;
        queryModel.ty = req.query.ty; // Monitored or monitoring
        queryModel.sd = req.query.sd;
        queryModel.endDate = req.query.ed;
        queryModel.ed = queryModel.endDate != null ? queryModel.endDate : new Date() / 1000 | 0;
        queryModel.page = req.query.page ? req.query.page : constants.const.PAGE;
        queryModel.size = req.query.size ? req.query.size : constants.const.SIZE;
        queryModel.token = req.headers["x-access-token"];
        queryModel.reqId = req.headers["x-request-id"];
        queryModel.url = queryModel.vid + "/" + queryModel.did + "/" + queryModel.mpid;
        queryModel.auth = 'Basic ' + new Buffer(config.amsUser + ':' + config.amsPwd).toString('base64');
        if (queryModel.sd > 0 && queryModel.ed > 0) {
            queryModel.url += "/" + queryModel.sd + "/" + queryModel.ed;
        }
        queryModel.url += "?page=" + queryModel.page + "&size=" + queryModel.size;
        return queryModel;
    };

    assetQueryBuilder.buildTempSensorParams = function (req) {
        var queryModel = new model();
        queryModel.vid = req.query.vid;
        queryModel.did = req.params.asset_id;
        queryModel.mpid = req.params.sensor_id;
        if(queryModel.vid == undefined  || queryModel.did == undefined || queryModel.mpid == undefined) {
            return;
        }
        queryModel.sint = req.query.sample_interval ? req.query.sample_interval : constants.const.SAMPLING_INTERVAL;
        queryModel.sd = req.query.sd;
        queryModel.ty = req.query.asset_type; // Monitored or monitoring
        queryModel.size = req.query.size ? req.query.size : constants.const.SIZE;
        queryModel.endDate = req.query.date;
        queryModel.ed = queryModel.endDate != null ? queryModel.endDate : new Date() / 1000 | 0;
        queryModel.page = req.query.page ? req.query.page : constants.const.PAGE;
        queryModel.size = req.query.size ? req.query.size : constants.const.SIZE;
        queryModel.token = req.headers["x-access-token"];
        queryModel.reqId = req.headers["x-request-id"];
        queryModel.url = queryModel.vid + "/" + queryModel.did + "/" + queryModel.mpid;
        queryModel.auth = 'Basic ' + new Buffer(config.amsUser + ':' + config.amsPwd).toString('base64');
        if (queryModel.sd > 0 && queryModel.ed > 0) {
            queryModel.url += "/" + queryModel.sd + "/" + queryModel.ed;
        }
        queryModel.url += "?page=" + queryModel.page + "&size=" + queryModel.size;

        return queryModel;
    };
})
(module.exports);
