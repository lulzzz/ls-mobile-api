/**
 * Created by smriti on 08/06/17.
 */

(function (approvalResBuilder) {
    "use strict";

    var path = require('path'),
        orderModel = require(path.resolve('./model/OrderResModel', '')),
        approvalModel = require(path.resolve('./model/ApprovalResModel', ''));

    approvalResBuilder.buildApprovalData = function (aData, oData) {
        var approvalList = [],
            i = 0;
        if (aData != undefined && oData != undefined) {
            var approvals = JSON.parse(aData),
                orders = JSON.parse(oData);
            var approvalData = approvals.content;
            approvalData.forEach(function (apData) {
                orders.some(function (orData) {
                    if (apData.type_id == orData.id) {
                        delete apData.approval_attributes;
                        var model = new orderModel();
                        model.id = orData.id;
                        model.eid = orData.eid;
                        model.enm = orData.enm;
                        model.eadd = orData.eadd;
                        model.vid = orData.vid;
                        model.vnm = orData.vnm;
                        model.vadd = orData.vadd;
                        model.noi = orData.size;
                        model.edd = orData.edd;
                        var appModel = new approvalModel;
                        appModel.items = apData;
                        appModel.items.order = model;
                        appModel.size = apData.size;
                        appModel.offset = apData.number;
                        appModel.last = apData.last;
                        appModel.total = apData.number_of_elements;
                        approvalList[i++] = appModel;
                        return true;
                    }
                });
            });
            return approvalList;
        }
        return null;
    };


})(module.exports);