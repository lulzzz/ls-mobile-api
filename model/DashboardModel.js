/**
 * Created by smriti on 5/4/17.
 */
"use strict";

module.exports = DashboardModel;

function DashboardModel() {
    this.items = [];
    this.tn = undefined; // total normal count
    this.tl = undefined; // total low count
    this.th = undefined; // total high count
    this.tu = undefined; // total unknown count
    this.tc = undefined; // total count
    this.restime = undefined; // response time
    this.sz = undefined;
    this.o = undefined;
}