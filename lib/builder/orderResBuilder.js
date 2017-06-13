/**
 * Created by smriti on 08/06/17.
 */

(function (orderResBuilder) {
    "use strict";

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
    }
})(module.exports);