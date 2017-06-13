/**
 * Created by smriti on 5/2/17.
 */

'use strict';

module.exports = AssetQueryModel;

function AssetQueryModel() {
    this.vid = undefined; // Vendor id/ manufacturer for an asset
    this.did = undefined; // Device id
    this.page = undefined; // No of pages
    this.size = undefined; // Size of data to be fetched
    this.auth = undefined; // basic authorization for TMS server
    this.eid = undefined; // Entity id
    this.ty = undefined; // asset type
    this.at = undefined; // Asset type (monitored/monitoring)
    this.alrmType = undefined; // Alarm type
    this.dur = undefined; // alarm duration
    this.ws = undefined; // working status
    this.awr = undefined; // asset with relationship
    this.page = undefined; // pages
    this.mpid = undefined; // monitoring points/sensor Id
    this.sint = undefined; // sampling intervals
    this.sd = undefined; // start date in millis
    this.ed = undefined; // end date in millis
    this.oa = false; // only recent alert data
    this.ot = false; // only asset temperature data
    this.reqId = undefined;
    this.data = undefined;
    this.offset = undefined;
    this.url = "";
}