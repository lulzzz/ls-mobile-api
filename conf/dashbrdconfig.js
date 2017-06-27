'use strict';

module.exports = {
    dash_inv: {
        url: '/dashboards/inventory',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    dash_invdetail: {
        url: '/dashboards/inventory/breakdown',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    dash_ast: {
        url: '/dashboards/assets',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    inv_detail: {
        url: '/m/inventory/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    single_inv_detail: {
        url: '/m/inventory/detail',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    }
}
