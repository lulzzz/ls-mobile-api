/**
 * Created by smriti on 17/05/17.
 */
(function (assetRespBuilder) {
    "use strict";
    var path = require('path'),
        deviceTempModel = require(path.resolve('./model/DeviceTempModel', '')),
        deviceTempAlertModel = require(path.resolve('./model/DeviceTempAlertsModel', '')),
        constants = require(path.resolve('./constants/constants', ''));

    assetRespBuilder.buildAssetData = function (aData, tempData, offset) {
        var assetData = JSON.parse(aData);

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
                    var assetActiveData = {};
                    var inactiveSinceData = {};
                    data.alrm.forEach(function (alrmdata) {
                        if (alrmdata.typ == constants.const.TYPE_ACTIVITY && alrmdata.mpId != null) {
                            if (alrmdata.stat == constants.const.STATUS_KNOWN) {
                                assetActiveData[alrmdata.mpId] = true;
                            } else {
                                assetActiveData[alrmdata.mpId] = false;
                                inactiveSinceData[alrmdata.mpId] = alrmdata.time;
                            }
                        }
                    });
                    var i = 0;
                    if (data.tmp != null) {
                        data.tmp.forEach(function (tempdata) {
                            if (tempdata.mpId == undefined) {
                                i++;
                            } else {
                                tempdata.iA = assetActiveData[tempdata.mpId] != undefined ? assetActiveData[tempdata.mpId] : true;
                                if(tempdata.iA) {
                                    tempdata.stut = tempdata.time;
                                } else {
                                    tempdata.stut = inactiveSinceData[tempdata.mpId] != undefined ? inactiveSinceData[tempdata.mpId] : tempdata.stut;
                                }
                                delete tempdata.time;
                            }
                        });
                        if (i > 0) {
                            data.tmp.splice(i - 1, 1);
                        }
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
        tp.sz = assetData.length;
        tp.of = parseInt(offset);
        return tp;
    };

    assetRespBuilder.buildRecentAlertModel = function (data) {
        var alertData = JSON.parse(data),
            tempAlertModel = new deviceTempAlertModel();

        if (alertData) {
            alertData.data.forEach(function (assetData) {
                var deviceModel = new deviceTempModel();
                if(assetData.tmpalm != undefined) {
                    deviceModel = assetData.tmpalm;
                    deviceModel.alrm = getAlarmData(assetData.tmpalm.st, assetData.tmpalm.aSt, deviceModel.tmp);
                    tempAlertModel.items.push(deviceModel);
                }
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

    assetRespBuilder.buildAssetTempDataModel = function (data, queryModel) {
        var recordCounter = 0,
            tempAlertModel = new deviceTempAlertModel(),
            tempData = JSON.parse(data),
            tData = tempData.data;
        var endTime = queryModel.endDate != null ? queryModel.endDate : 0;
        if (tData) {
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