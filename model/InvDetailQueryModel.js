'use strict';

module.exports = InvDashQueryModel;
module.exports = SingleInvDetailModel;

function InvDashQueryModel() {

    this.dId = undefined;
    this.eid = undefined;
    this.mid = undefined;
    this.abty = undefined;
    this.mtags = undefined;
    this.etags = undefined;
    this.offset = undefined;
    this.size = undefined;
    this.user = undefined;
    this.reqId = undefined;
    this.loc = undefined;
    this.eetag = undefined;
}

function SingleInvDetailModel() {

    this.dId = undefined;
    this.entity_id = undefined;
    this.material_id = undefined;
    this.offset = undefined;
    this.size = undefined;
}
(module.exports);

