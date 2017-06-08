/**
 * Created by smriti on 17/05/17.
 */
(function (assetRespBuilder) {
    "use strict";
    var path = require('path'),
        deviceTempModel = require(path.resolve('./model/DeviceTempModel', '')),
        deviceTempAlertModel = require(path.resolve('./model/DeviceTempAlertsModel', '')),
        constants = require(path.resolve('./constants/constants',''));

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
                    var i =0;
                    if (data.tmp != null) {
                        data.tmp.forEach(function (tempdata) {
                            if (tempdata.mpId == undefined) {
                                i++;
                            } else {
                                delete tempdata.stut;
                            }
                        });
                        if (i > 0) {
                            data.tmp.splice(i - 1, 1);
                        }
                        assets.temp = data.tmp;
                    }
                    /*if (data.tmp != null) {
                        data.tmp.forEach(function (tempdata) {
                            delete tempdata.stut;
                        });

                    }*/
                    delete assets.iDa;
                    delete assets.sno;
                }
            });
        });
        var tp = {};
        tp.items = {};
        tp.items = assetData;
        tp.sz = assetData.length;
        tp.of = parseInt(offset);
        return tp;
    };

    assetRespBuilder.buildRecentAlertModel = function (alertData) {
        var tempAlertModel = new deviceTempAlertModel();
        if(alertData) {
            alertData.data.forEach(function (assetData) {
                var deviceModel = new deviceTempModel();
                deviceModel.mpId = assetData.tmpalm.mpId;
                deviceModel.tmp = assetData.tmpalm.tmp;
                deviceModel.alrm = getAlarmData(assetData.tmpalm.st, assetData.tmpalm.aSt, deviceModel.tmp);
                deviceModel.time = assetData.tmpalm.time;
                tempAlertModel.items.push(deviceModel);
            });
            tempAlertModel.nPages = alertData.nPages;
            tempAlertModel.size = alertData.data.length;
        }
        return tempAlertModel;
    };

    function getAlarmData(status, tempStatus, temp) {
        var alarm;
        switch (status) {
            case constants.const.STATUS_EXCURSION:
                alarm = tempStatus == constants.TEMP_TYPE_LOW ? "Low" : "High";
                alarm = alarm + " temperature excursion of " + temp + " \u00B0" + "C";
                break;
            case constants.const.STATUS_WARNING:
                alarm = tempStatus == constants.TEMP_TYPE_LOW ? "Low" : "High";
                alarm = alarm + " temperature warning of " + temp + " \u00B0" + "C";
                break;
            case constants.const.STATUS_ALARM:
                alarm = tempStatus == constants.TEMP_TYPE_LOW ? "Low" : "High";
                alarm = alarm + " temperature alarm of " + temp + " \u00B0" + "C";
                break;
            case constants.const.STATUS_NORMAL:
                alarm = "Temperature incursion of " + temp + " \u00B0" + "C";
        }
        return alarm;
    }

    assetRespBuilder.buildAssetTempDataModel = function (tempData, queryModel) {
        var recordCounter = 0,
            tempAlertModel = new deviceTempAlertModel(),
            tData = tempData.data;
        var endTime = queryModel.endDate != null ? queryModel.endDate : 0;
        if(tData) {
            for (var i = 0; i < tData.length; i++) {
                if (endTime > 0 && queryModel.sint > 0 && (endTime - tData[i].time) > (2 * queryModel.sint)) {
                    var missingDataPts = parseInt(endTime - tData[i].time) / parseInt((queryModel.sint));
                    for (var j = 0; i < missingDataPts; j++) {
                        var deviceModel = new deviceTempModel();
                        deviceModel.time = parseInt(endTime - i * queryModel.sint);
                        deviceModel.pwa = "";
                        tempAlertModel.temp.push(deviceModel);
                        recordCounter++;
                        if (recordCounter >= queryModel.sint) {
                            break;
                        }
                    }
                }
                recordCounter++;
                if (recordCounter >= queryModel.sint) {
                    break;
                } else {
                    deviceModel = new deviceTempModel();
                    endTime = deviceModel.time = tData[i].time;
                    deviceModel.typ = tData[i].typ;
                    deviceModel.tmp = tData[i].tmp;
                    deviceModel.pwa = tData[i].pwa != null ? tData[i].pwa : "";
                    tempAlertModel.temp.push(deviceModel);
                }
            }
            tempAlertModel.tPages = tempData.nPages;
        }
        return tempAlertModel;
    };
})(module.exports);