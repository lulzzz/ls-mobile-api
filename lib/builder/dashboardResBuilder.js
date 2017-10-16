/**
 * Created by smriti on 18/05/17.
 */

(function (dashboardResBuilder) {
    "use strict";

    var path = require('path'),
        assetModel = require(path.resolve('./model/DashboardModel', '')),
        InvDetailResModel = require(path.resolve('./model/InvDetailResModel', '')),
        activityDashboardResModel = require(path.resolve('./model/activityDashboardResModel', '')),
        utils = require(path.resolve('./lib/utils/common/common-utils', ''));

    dashboardResBuilder.buildAssetDashboardModel = function (tempData) {
        var data = tempData.tempDomain;
        var model = new assetModel();
        model.tn = data.tn != null ? parseInt(data.tn) : 0;
        model.th = data.th != null ? parseInt(data.th) : 0;
        model.tu = data.tu != null ? parseInt(data.tu) : 0;
        model.tl = data.tl != null ? parseInt(data.tl) : 0;
        model.tc = model.tn + model.th + model.tu + model.tl;
        model.l = tempData.mLev;
        model.restime = null;
        model.items = undefined;
        return model;
    };

    dashboardResBuilder.buildAssetDashbDetailModel = function (tData, locty) {
        var tempData = JSON.parse(tData),
            data = tempData.temp,
            eventKeys = Object.keys(data),
            level = tempData.mLev;

        for (var i = 0; i < eventKeys.length; i++) {
            var evntTempData = data[eventKeys[i]];
            var locKeys = Object.keys(evntTempData);
            var locTempData = Object.keys(evntTempData).map(function (key) {
                return evntTempData[key];
            });
            if (locKeys != null) {
                for (var c = 0; c < locTempData.length; c++) {
                    if (level != "district") {
                        locTempData[c].lcid = locKeys[c];
                        locTempData[c].lcnm = locKeys[c];
                    } else {
                        locTempData[c].knm = locKeys[c];
                    }
                }
            }
            evntTempData = locTempData;
            data[eventKeys[i]] = evntTempData;
        }
        data.l = level;
        var sortBy = 'lcnm';
        if (locty == 'district') {
            sortBy = 'knm';
        }
        data.tn = this.sortData(data.tn, 'value', 'den', sortBy);
        data.tl = this.sortData(data.tl, 'value', 'den', sortBy);
        data.th = this.sortData(data.th, 'value', 'den', sortBy);
        data.tu = this.sortData(data.tu, 'value', 'den', sortBy);
        return data;
    };

    dashboardResBuilder.transformInvDetailResponse = function (data, groupBy, locty) {
        var d = JSON.parse(data);
        var resmodel = new InvDetailResModel();
        if (d.items instanceof Array) {
            for (var i in d.items) {
                var item = d.items[i];
                if (item.nc != undefined && item.nc > 0) {
                    resmodel.n.push(item);
                }
                if (item.soc != undefined && item.soc > 0) {
                    resmodel.so.push(item);
                }
                if (item.gmc != undefined && item.gmc > 0) {
                    resmodel.mx.push(item);
                }
                if (item.lmnc != undefined && item.lmnc > 0) {
                    resmodel.mn.push(item);
                }
            }
        }
        if (d.total != undefined) {
            resmodel.total = d.total;
        }
        if (d.offset != undefined) {
            resmodel.offset = d.offset;
        }
        if (d.size != undefined) {
            resmodel.size = d.size;
        }
        if (d.level != undefined) {
            resmodel.l = d.level;
        }
        var sortBy = 'mnm';
        if (groupBy == 'loc' && locty == 'district') {
            sortBy = 'enm';
        } else if (groupBy == 'loc') {
            sortBy = 'lcnm';
        }
        resmodel.n = this.sortData(resmodel.n, 'nc', 'tc', sortBy);
        resmodel.mn = this.sortData(resmodel.mn, 'lmnc', 'tc', sortBy);
        resmodel.mx = this.sortData(resmodel.mx, 'gmc', 'tc', sortBy);
        resmodel.so = this.sortData(resmodel.so, 'soc', 'tc', sortBy);
        return resmodel;
    };

    dashboardResBuilder.sortData = function (data, eventType, total, sortBy) {
        if (utils.checkNotNullEmpty(data)) {
            return data.sort(function (value1, value2) {

                var diff = parseFloat(value2[eventType] / value2[total]) - parseFloat(value1[eventType] / value1[total]);
                if (diff == 0) {
                    if (utils.checkNotNullEmpty(value1[sortBy]) && utils.checkNotNullEmpty(value2[sortBy])) {
                        return value1[sortBy].toLowerCase().localeCompare(value2[sortBy].toLowerCase());
                    }
                }
                return diff;
            });
        }
        return data;
    };

    dashboardResBuilder.buildActivityDashboard = function (data) {
        var model = new activityDashboardResModel();
        if(utils.checkNotNullEmpty(data)) {
            if (utils.checkNotNullEmpty(data.entDomain)) {
                model.a = data.entDomain.a;
                model.i = data.entDomain.i;
            }
            model.l = data.mLev;
            var sortBy = model.l == "district" ? "knm" : "lcnm";
            var keys = Object.keys(data.ent);
            for (var i = 0; i < keys.length; i++) {
                var activityData = data.ent[keys[i]];
                var activityKeys = Object.keys(activityData);
                for (var j = 0; j < activityKeys.length; j++) {
                    if(utils.checkNotNullEmpty(activityKeys[j])) {
                        if (sortBy == "knm") {
                            activityData[activityKeys[j]].knm = activityKeys[j];
                        } else {
                            activityData[activityKeys[j]].lcnm = activityKeys[j];
                        }
                        model.items[keys[i]].push(activityData[activityKeys[j]]);
                    }
                }
            }
            model.items["a"] = this.sortData(model.items.a, "value", "den", sortBy);
            model.items["i"] = this.sortData(model.items.i, "value", "den", sortBy);
        }
        return model;
    }
})(module.exports);