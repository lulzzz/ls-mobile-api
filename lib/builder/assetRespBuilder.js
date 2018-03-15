/**
 * Created by smriti on 17/05/17.
 */
(function (assetRespBuilder) {
    "use strict";
    var path = require('path'),
        deviceTempModel = require(path.resolve('./model/DeviceTempModel', '')),
        deviceTempAlertModel = require(path.resolve('./model/DeviceTempAlertsModel', '')),
        constants = require(path.resolve('./lib/constants/constants', '')),
        assetResModel = require(path.resolve('./model/assetResModel', '')),
        assetDetail = require(path.resolve('./model/assetDetailModel', '')),
        utils = require(path.resolve('./lib/utils/common/common-utils', ''));


    assetRespBuilder.buildAssetData = function (aData, tempData, offset) {
        var assetData = JSON.parse(aData);

        if(assetData.length > 0) {
            assetData.forEach(function (assets) {
                tempData.some(function (data) {
                    if (assets.dId == data.dId) {
                        assets.typ = data.typ;
                        assets.vId = data.vId;
                        assets.dId = data.dId;
                        assets.ws = data.ws;
                        assets.ws.st = constants.const.WORKING_STATUS[assets.ws.st];
                        assets.id = data.id;
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
                                    if (tempdata.iA) {
                                        tempdata.stut = tempdata.time;
                                    } else {
                                        if(tempdata.time == 0) {
                                            tempdata.stut = 0;
                                        } else if(inactiveSinceData[tempdata.mpId] != undefined) {
                                            tempdata.stut = inactiveSinceData[tempdata.mpId];
                                        }
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
        }
        var model = new assetResModel();
        model.items = assetData;
        model.sz = assetData.length;
        model.of = parseInt(offset);
        return model;
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
                alarm = tempStatus == constants.const.TEMP_TYPE_LOW ? "Low" : "High";
                alarm = alarm + " temperature excursion of " + temp + " \u00B0" + "C";
                break;
            case constants.const.STATUS_WARNING:
                alarm = tempStatus == constants.const.TEMP_TYPE_LOW ? "Low" : "High";
                alarm = alarm + " temperature warning of " + temp + " \u00B0" + "C";
                break;
            case constants.const.STATUS_ALARM:
                alarm = tempStatus == constants.const.TEMP_TYPE_LOW ? "Low" : "High";
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

    assetRespBuilder.buildAssetDetailsModel = function (data) {
        var activity = data[0],
            temperature = data[1],
            model = new assetResModel();
        model.items = activity.items;
        model.temp = temperature.temp;
        model.nPages = activity.nPages;
        model.size = activity.size;
        model.tPages = temperature.tPages;
        return model;
    };

    assetRespBuilder.buildAssetActivityModel = function (data) {
        var activity = data[0],
            model = new assetResModel();
        model.items = activity.items;
        model.nPages = activity.nPages;
        model.size = activity.size;
        return model;
    };

    assetRespBuilder.buildAssetStatusModel = function (data) {
        var temperature = data[0],
            model = new assetResModel();
        model.temp = temperature.temp;
        model.tPages = temperature.tPages;
        return model;
    };

    assetRespBuilder.buildAssetDetailModel = function (data) {
        var model = new assetDetail();
        model.asset_type = data.typ;
        model.monitoring_type = data.mtyp;
        model.model = data.mdl;
        model.serial_no = data.dId;
        model.manufacturer_code = data.vId;
        model.updated_by = {};
        model.updated_by.id = data.ub;
        model.updated_by.name = data.lubn;
        model.updated_on = data.uflts;
        model.domain_id = data.sdid;
        model.domain_name = data.sdname;
        model.working_status =  {};
        model.working_status.code = data.ws.st + 1;
        var d = data.ws.stut ;
        if (utils.checkNotNullEmpty(d)) {
            model.working_status.updated_timestamp = new Date(d*1000).toISOString();
        }
        model.capacity = {};
        if(!utils.checkNullEmptyObject(data.meta.cc)) {
            model.capacity.quantity = data.meta.cc.qty;
            model.capacity.units = data.meta.cc.met;
        }
        model.owners = [];
        if(data.ons.length > 0 ) {
            data.ons.forEach(function(entry){
                var usr = {};
                usr.id = entry.id;
                usr.name = entry.fnm;
                usr.phone = entry.phm;
                model.owners.push(usr);
            });
        }
        model.maintainers =[];
        if(data.mts.length > 0) {
            data.ons.forEach(function(entry){
                var usr = {};
                usr.id = entry.id;
                usr.name = entry.fnm;
                usr.phone = entry.phm;
                model.maintainers.push(usr);
            });
        }
        var inactiveSinceData = {};
        if(data.alrm.length > 0) {
            data.alrm.forEach(function (alrmdata) {
                if (alrmdata.typ == constants.const.TYPE_ACTIVITY && utils.checkNotNullEmpty(alrmdata.mpId)) {
                    inactiveSinceData[alrmdata.mpId] = alrmdata.time;
                }
            });
        }
        model.monitoring_points = [];
        if(data.tmp.length > 0) {
            data.tmp.forEach(function (entry) {
                if (utils.checkNotNullEmpty(entry.mpId)) {
                    var mp = {};
                    mp.monitoring_point = entry.mpId;
                    mp.temperature_status = entry.st;
                    mp.temperature = entry.tmp;
                    var dt = entry.time;
                    if (utils.checkNotNullEmpty(dt)) {
                        mp.temperature_time = new Date(dt*1000).toISOString();
                    }
                    mp.abnormality_type = entry.aSt;
                    mp.activity_status = entry.isActive;
                    var d = undefined;
                    if(entry.isActive) {
                        d = entry.stut;
                    } else {
                        if(entry.time == 0) {
                            d = 0;
                        } else if(utils.checkNotNullEmpty(inactiveSinceData[entry.mpId])) {
                            d = inactiveSinceData[entry.mpId];
                        }
                    }
                    if(utils.checkNotNullEmpty(d) && d > 0) {
                        mp.status_updated_on = new Date(d*1000).toISOString();
                    }
                    model.monitoring_points.push(mp);
                } else {
                    model.temperature_status = entry.st;
                    model.abnormality_type =  entry.aSt;
                    model.activity_status = entry.isActive;
                }
            });
        }
        model.related_assets = [];
        if(!utils.checkNullEmptyObject(data.rel)) {
            for (var v in data.rel) {
                var relObj = data.rel[v];
                var subrelObj = {};
                subrelObj.moniotoring_point = relObj.mpId;
                subrelObj.sensor = relObj.sId;
                subrelObj.related_asset = {};
                subrelObj.related_asset.asset_type = relObj.typ;
                subrelObj.related_asset.monitoring_type = undefined;
                if (utils.checkNotNullEmpty(relObj.meta.mdl)) {
                    subrelObj.related_asset.model = relObj.meta.mdl;
                }
                subrelObj.related_asset.serial_no = relObj.dId;
                subrelObj.related_asset.manufacturer_code = relObj.vId;
                model.related_assets.push(subrelObj);
            }
        }
        return model;
    };
})(module.exports);

