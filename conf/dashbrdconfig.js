'use strict';

module.exports = {
    dash_inv: {
        url: '/dashboards/inventory',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    dash_invdetail: {
        url: '/dashboards/inventory/breakdown',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    dash_ast: {
        url: '/dashboards/assets',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    inv_detail: {
        url: '/inventory/',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    single_inv_detail: {
        url: '/inventory/entity',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    dash_act: {
        url: '/dashboards/activity',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    report: {
        url: '/plugins/report/',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    }
};
