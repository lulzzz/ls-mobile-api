/**
 * Created by smriti on 17/05/17.
 */
(function(assetRespBuilder) {
    "use strict";
    assetRespBuilder.buildAssetData = function(assetData, tempData, offset) {
        assetData.forEach(function(assets) {
            tempData.some(function (data) {
                if(assets.dId == data.dId) {
                    assets.typ = data.typ;
                    assets.vId = data.vId;
                    assets.dId = data.dId;
                    assets.ws = data.ws;
                    assets.mdl = data.meta.dev.mdl;
                    assets.et = {};
                    if(assets.entity != null) {
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
                    if(data.tmp != null) {
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
        tp.size = assetData.length;
        tp.o = parseInt(offset);
        return tp;
    };
}) (module.exports);