/**
 * Created by smriti on 17/05/17.
 */
(function (assetRespBuilder) {
    "use strict";
    var path = require('path'),
        deviceTempModel = require(path.resolve('./model/DeviceTempModel', '')),
        deviceTempAlertModel = require(path.resolve('./model/DeviceTempAlertsModel', ''));

    assetRespBuilder.buildAssetData = function (assetData, tempData, offset) {
        assetData.forEach(function (assets) {
            tempData.some(function (data) {
                if (assets.dId == data.dId) {
                    assets.typ = data.typ;
                    assets.vId = data.vId;
                    assets.dId = data.dId;
                    assets.ws = data.ws;
                    assets.mdl = data.meta.dev.mdl;
                    assets.et = {};
                    if (assets.entity != null) {
                        var et = assets.entity;
                        assets.et.id = et.id;
                        assets.et.nm = et.nm;
                        assets.et.ctr = et.ctr;
                        assets.et.st = et.st;
                        assets.et.ds = et.ds;
                        assets.et.ct = et.ct;
                        assets.et.tlk = et.tlk;
                        delete assets.entity;
                    }
                    if (data.tmp != null) {
                        data.tmp.forEach(function (tempdata) {
                            delete tempdata.stut;
                        });
                        assets.temp = data.tmp;
                    }
                    delete assets.iDa;
                    delete assets.sno;
                }
            });
        });
        var tp = {};
        tp.items = {};
        tp.items = assetData;
        tp.s = assetData.length;
        tp.o = parseInt(offset);
        return tp;
    };

    assetRespBuilder.buildRecentAlertModel = function (alertData) {
        var tempAlertModel = new deviceTempAlertModel();
        alertData.data.forEach(function (assetData) {
            var deviceModel = new deviceTempModel();
            deviceModel.ft = assetData.ft;
            deviceModel.st = assetData.tmpalm.st;
            deviceModel.mpId = assetData.tmpalm.mpId;
            deviceModel.temp = assetData.tmpalm.tmp;
            tempAlertModel.items.push(deviceModel);
        });
        tempAlertModel.nPages = alertData.nPages;
        tempAlertModel.size = alertData.data.length;
        return tempAlertModel;
    };

    assetRespBuilder.buildAssetTempDataModel = function (tempData, queryModel) {
        var recordCounter = 0,
            tempAlertModel = new deviceTempAlertModel(),
            tData = tempData.data;
        for (var i = 0; i < tData.length; i++) {
            if (queryModel.ed > 0 && queryModel.sint > 0 && (queryModel.ed - tData[i].time) > (2 * queryModel.sint)) {
                var missingDataPts = parseInt(queryModel.ed - tData[i].time) / parseInt((queryModel.sint));
                for (var j = 0; i < missingDataPts; j++) {
                    var deviceModel = new deviceTempModel();
                    deviceModel.time = parseInt(queryModel.ed - i * queryModel.sint);
                    deviceModel.pwa = "";
                    tempAlertModel.temp.push(deviceModel);
                    recordCounter++;
                    if (recordCounter >= 300) {
                        break;
                    }
                }
            }
            recordCounter++;
            if (recordCounter >= 300) {
                break;
            } else {
                deviceModel = new deviceTempModel();
                queryModel.ed = deviceModel.time = tData[i].time;
                deviceModel.typ = tData[i].typ;
                deviceModel.tmp = tData[i].tmp;
                deviceModel.pwa = tData[i].pwa != null ? tData[i].pwa : "";
                tempAlertModel.temp.push(deviceModel);
            }
        }
        tempAlertModel.tPages = tempData.nPages;
        return tempAlertModel;
    };
})(module.exports);