/**
 * Created by smriti on 04/05/17.
 */
'use strict';

module.exports = assetDashboardQueryModel;

function assetDashboardQueryModel() {

    this.level = undefined;
    this.tPeriod = undefined;
    this.excludeETag = undefined;
    this.skipCache = undefined;
    this.onlyTempData = true;
    this.filter = undefined;
    this.aType = undefined;
    this.user = undefined;
    this.reqId = undefined;
}