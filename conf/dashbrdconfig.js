'use strict';

module.exports = {
    dash_inv: {
        url: '/m/dashboards/inventory',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    dash_invdetail: {
        url: '/m/dashboards/inventory/detail',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    dash_ast: {
        url: '/dashboard/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    dash_astdetail: {
        url: '/m/dashboards/assets/detail',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    inv_detail: {
        url: '/inventory/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    single_inv_detail: {
        url: '/inventory/entity',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    }
}
