/**
 * Created by smriti on 18/05/17.
 */

(function(dashboardResBuilder) {
    "use strict";

    var assetModel = require('../../model/DashboardModel');

    dashboardResBuilder.buildAssetDashboardModel = function(tempData) {
        var data = tempData.tempDomain;
        var model = new assetModel();
        model.tn = data.tn != null ? parseInt(data.tn) : 0;
        model.th = data.th != null ? parseInt(data.th) : 0;
        model.tu = data.tu != null ? parseInt(data.tu) : 0;
        model.tl = data.tl != null ? parseInt(data.tl) : 0;
        model.tc = model.tn + model.th + model.tu + model.tl;
        model.l = tempData.mLev;
        model.sz = data.size;
        model.o = data.offset;
        model.restime = null;
        model.items = undefined;
        return model;
    };

    dashboardResBuilder.buildAssetDashbDetailModel = function(tempData) {
        var data = tempData.temp;
        var model = new assetModel();
        var eventKeys = Object.keys(data);
        for (var i = 0; i < eventKeys.length; i++) {
            var evntTempData = data[eventKeys[i]];
            var locKeys = Object.keys(evntTempData);
            var locTempData = Object.keys(evntTempData).map(function(key) {
                return evntTempData[key];
            });
            if (locKeys != null) {
                for (var c = 0; c < locTempData.length; c++) {
                    locTempData[c].lcid = locKeys[c];
                    locTempData[c].lcnm = locKeys[c];
                }
            }
            evntTempData = locTempData;
            data[eventKeys[i]] = evntTempData;
        }
        model.items = data;
        model.l = tempData.mLev;
        return model;
    };
})(module.exports);