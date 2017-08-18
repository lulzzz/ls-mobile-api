/**
 * Created by smriti on 18/05/17.
 */

(function (dashboardResBuilder) {
    "use strict";

    var path = require('path'),
        assetModel = require(path.resolve('./model/DashboardModel', ''));

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

    dashboardResBuilder.buildAssetDashbDetailModel = function (tData) {
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
                    if(level != "district") {
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
        return data;
    };

    dashboardResBuilder.transformInvDetailResponse = function(data) {
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
        resmodel.n = this.sortData(resmodel.n, 'nc');
        resmodel.mn = this.sortData(resmodel.mn, 'lmnc');
        resmodel.mx = this.sortData(resmodel.mx, 'gmc');
        resmodel.so = this.sortData(resmodel.so, 'soc');

        return resmodel;
    };

    dashboardResBuilder.sortData = function (data, eventType) {
        return data.sort(function (value1, value2) {

            var diff = parseFloat(value2[eventType] / value2.tc) - parseFloat(value1[eventType] / value1.tc);
            if (diff == 0) {
                return value1.mnm.localeCompare(value2.mnm);
            }
            return diff;
        });
    };
})(module.exports);