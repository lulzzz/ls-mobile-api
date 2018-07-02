/**
 * Created by yuvaraj on 27/06/18.
 */

(function (orderResponseBuilder) {
    "use strict";
    
    var path = require('path'),
        commonUtils = require(path.resolve('./lib/utils/common/common-utils', ''));
    
    orderResponseBuilder.buildOrderList = function (data) {
        var ordersData = {};
        data = JSON.parse(data);
        ordersData.data = [];
        ordersData.total = 0;
        ordersData.offset = data.offset;
        if (commonUtils.checkNotNullEmptyArray(data.results)) {
            ordersData.total = data.numFound;
            ordersData.size = data.results.length;
            data.results.forEach(function (data) {
                var dt = {};
                dt.id = data.id;
                dt.size = data.size;
                dt.currency = data.cur;
                dt.price = data.price;
                dt.order_status = data.status;
                dt.created_date = data.cdt;
                dt.updated_date = data.udt;
                dt.status_update_date = data.statusUpdateDate;
                dt.tax = data.tax;
                dt.user_id = data.uid;
                dt.entity_id = data.eid;
                dt.vendor_id = data.vid;
                dt.vendor_name = data.vnm;
                dt.entity_name = data.enm;
                dt.source_order_creation = data.src;
                dt.entity_latitude = data.elt;
                dt.entity_longitude = data.eln;
                dt.status_code = data.st;
                dt.order_tags = data.tgs;
                dt.serial_number = data.sno;
                dt.user_name = data.unm;
                dt.updated_by = data.uby;
                dt.has_vendor_access = data.hva;
                dt.source_domain_id = data.sdid;
                dt.source_domain_name = data.sdname;
                dt.customer_address = data.eadd;
                dt.vendor_address = data.vadd;
                dt.updated_by_id = data.ubid;
                dt.access_to_vendor = data.atv;
                dt.access_to_view_vendor = data.atvv;
                dt.access_to_customer = data.atc;
                dt.access_to_view_customer = data.atvc;
                dt.order_type = data.oty;
                dt.allow_cancel = data.alc;
                dt.order_updated_at = data.orderUpdatedAt;
                dt.domain_ids = data.dids;
                dt.visible_to_customer = data.vtc;
                dt.visble_to_vendor = data.vtv;
                dt.customer_batch_managable = data.ebm;
                dt.vendor_batch_managable = data.vbm;
                ordersData.data.push(dt);
            });
        }
        return ordersData;
    };
    
    
})(module.exports);