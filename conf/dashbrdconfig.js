'use strict';

module.exports = {
    dash_inv : {
        url: '/m/dashboards/inventory',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    },
    dash_invdetail : {
        url: '/m/dashboards/inventory/detail',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    },
    dash_ast : {
        url: '/m/dashboards/assets',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    },
    dash_astdetail : {
        url: '/m/dashboards/assets/detail',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    },
    inv_detail : {
        url: '/m/inventory/',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    },
    material_search:{
        url: '/materials/',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    }
}
