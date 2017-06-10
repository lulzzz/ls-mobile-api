/**
 * Created by smriti on 08/06/17.
 */

(function (orderResBuilder) {
    "use strict";

    var path = require('path'),
        constants = require(path.resolve('./lib/constants/constants',''));

    orderResBuilder.getOrderIds = function (data) {
        var appData = JSON.parse(data);
        var ids = "";
        if (appData.content != null) {
            appData.content.forEach(function (approval) {
                if (ids != "") {
                    ids += ",";
                }
                ids += approval.type_id != undefined ? approval.type_id : "";

            });
        }
        return ids;
    };

    orderResBuilder.buildDemandItems = function (data) {
        var demandItems = JSON.parse(data);
        demandItems.forEach(function (item) {
            item.kid = item.e.id;
            item.knm = item.e.nm;
            item.event = getEvent(item.event);
            delete item.e;
            delete item.sno;
            delete item.allocations;
            delete item.vevent;
            delete item.bd;
        });
        return demandItems;
    };

    function getEvent(eventId) {
        var stock = constants.const,
            eventType;
        switch(eventId) {
            case stock.ZERO_STOCK:
                eventType = "Stocked out";
                break;
            case stock.MIN_STOCK:
                eventType = "Likely to stock out";
                break;
            case stock.MAX_STOCK:
                eventType = "Max stock";
                break;
            case stock.NORMAL_STOCK:
                eventType = "Normal stock";
        }
        return eventType;
    }
})(module.exports);