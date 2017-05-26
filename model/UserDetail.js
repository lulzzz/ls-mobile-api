'use strict';

module.exports = UserDetail; //UserDetail or UserDetail() both are fine.

function UserDetail() {
    var uid;
    var fnm;
    var lnm;
    var eml;
    var mob;
    var altph;
    var dmn = UserDomainDetail;
    var config = UserConfig;
}

function UserDomainDetail() {
    var nm;
    var id;
    var loc;
}

function UserConfig() {
    var dboard = DashboardConfig;
}
function DashboardConfig() {
    var dmtgs;
    var aper;
    var dtt;
    var edm;
    var atdd;
    var exetgs;
    var extstts;
    var dutgs;
}
