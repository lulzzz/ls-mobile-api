/**
 * Created by smriti on 17/05/17.
 */

(function (assetQueryBuilder) {
    "use strict";
    var path = require('path'),
        model = require(path.resolve('./model/AssetQueryModel', '')),
        constants = require(path.resolve('./lib/constants/constants')),
        config = require(path.resolve('./conf', '')),
        utils = require(path.resolve('./lib/utils/common/common-utils',''));

    assetQueryBuilder.buildTempDataParams = function (req) {
        var queryModel = new model();
        var tag = req.query.did;
        if (req.query.eid) {
            tag = "kiosk." + req.query.eid;
        }
        queryModel.url += tag + "/devices?";
        if(utils.checkNotNullEmpty(req.query.monitoring_type) && utils.checkNullEmpty(req.query.ty)) {
            queryModel.url += "&mType=" + req.query.monitoring_type;
        } else if (utils.checkNotNullEmpty(req.query.ty)) {
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
        queryModel.reqId = req.headers["x-request-id"];
        return queryModel;
    };

    assetQueryBuilder.buildAssetListingParams = function (req, data) {
        var queryModel = new model();
        queryModel.offset = req.query.of ? req.query.of : constants.const.OFFSET;
        queryModel.size = req.query.sz ? req.query.sz : constants.const.SIZE;
        queryModel.data = JSON.stringify({data: data});
        queryModel.reqId = req.headers["x-request-id"];
        queryModel.user = req.headers["x-access-user"];
        return queryModel;
    };

    assetQueryBuilder.buildTempAlertParams = function (req) {
        var queryModel = new model();
        queryModel.vid = req.query.vid;
        queryModel.did = req.query.did;
        queryModel.mpid = req.query.mpid;
        queryModel.sint = req.query.sint ? req.query.sint : constants.const.SAMPLING_INTERVAL;
        queryModel.ty = req.query.ty; // Monitored or monitoring
        queryModel.sd = req.query.sd;
        queryModel.ed = req.query.ed != null ? req.query.ed : new Date() / 1000 | 0;
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
        queryModel.vid = req.params.manufacturer_code;
        queryModel.did = req.params.serial_no;
        queryModel.mpid = req.params.monitoring_position_id;
        queryModel.sint = req.query.sampling_interval ? req.query.sampling_interval : constants.const.SAMPLING_INTERVAL;
        queryModel.sd = req.query.start_date;
        queryModel.ty = req.query.monitoring_type; // Monitored or monitoring
        queryModel.size = req.query.size ? req.query.size : constants.const.SIZE;
        queryModel.ed = req.query.end_date != null ? req.query.end_date : new Date() / 1000 | 0;
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
    assetQueryBuilder.buildAssetActivityParams = function (req) {
        var queryModel = new model();
        queryModel.vid = req.params.manufacturer_code;
        queryModel.did = req.params.serial_no;
        queryModel.page = req.query.page ? req.query.page : constants.const.PAGE;
        queryModel.size = req.query.size ? req.query.size : constants.const.SIZE;
        queryModel.token = req.headers["x-access-token"];
        queryModel.reqId = req.headers["x-request-id"];
        queryModel.auth = 'Basic ' + new Buffer(config.amsUser + ':' + config.amsPwd).toString('base64');
        return queryModel;
    };

    assetQueryBuilder.buildAssetStatusParams = function (req) {
        var queryModel = new model();
        queryModel.body.st = req.body.status_code - 1;
        queryModel.token = req.headers["x-access-token"];
        queryModel.reqId = req.headers["x-request-id"];
        queryModel.user = req.headers["x-access-user"];
        queryModel.url = req.params.manufacturer_code + "/" + encodeURI(req.params.serial_no) + "/status";
        return queryModel;
    };

    assetQueryBuilder.buildAssetDetailsParams = function (req) {
        var queryModel = new model();
        queryModel.reqId = req.headers["x-request-id"];
        queryModel.user = req.headers["x-access-user"];
        if(utils.checkNotNullEmpty(req.params.manufacturer_code) && utils.checkNotNullEmpty(req.params.serial_no)) {
            queryModel.url = req.params.manufacturer_code + "/" + encodeURI(req.params.serial_no);
        }
        return queryModel;
    };
})(module.exports);
