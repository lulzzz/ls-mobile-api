'use strict';

module.exports = assetDetailModel;

function assetDetailModel() {
    this.asset_type = undefined;
    this.monitoring_type = undefined;
    this.model = undefined;
    this.serial_no = undefined;
    this.manufacturer_code = undefined;
    this.updated_by = {};
    this.updated_on = undefined;
    this.temperature_status = undefined;
    this.abnormality_type = undefined;
    this.activity_status = undefined;
    this.domain_id = undefined;
    this.domain_name = undefined;
    this.owners = undefined;
    this.maintainers = undefined;
    this.monitoring_points = undefined;
    this.working_status =  undefined;
    this.capacity = undefined;
    this.capacity_new = undefined;
    this.related_assets = undefined;
    this.entity = undefined;
}