/**
 * Created by smriti on 5/2/17.
 */

'use strict'

module.exports = AssetQueryModel;

function AssetQueryModel() {
    this.vId = undefined; // Vendor id/ manufacturer for an asset
    this.dId = undefined; // Device id
    this.page = undefined; // No of pages
    this.size = undefined; // Size of data to be fetched
    this.auth = undefined; // basic authorization for TMS server
    this.eid = undefined;
    this.ty = undefined; // asset type
    this.at = undefined; //alarm type
    this.dur = undefined; // alarm duration
    this.ws = undefined; // working status
    this.awr = undefined; // asset with relationship
    this.page = undefined; // pages
}