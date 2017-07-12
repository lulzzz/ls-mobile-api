'use strict';

module.exports = {
    server: {
        protocol:"http",
        host:"localhost",
        port:"8080",
        root_path:"s2/api"
    },
    login: {
        url: '/mauth/login',
        method: 'POST',
        timeout: 1000
    },
    generateotp: {
        url: '/auth/generateOtp',
        method: 'POST',
        timeout: 1000
    },
    validateotp: {
        url: '/mauth/validateotp',
        method: 'POST',
        timeout: 1000
    },
    resetpassword: {
        url: '/mauth/change-password',
        method: 'POST',
        timeout: 1000
    },
    dash_inv: {
        url: '/dashboards/inventory',
        method: 'GET',
        timeout: 1000
    },
    dash_invdetail: {
        url: '/dashboards/inventory/breakdown',
        method: 'GET',
        timeout: 1000
    },
    dash_ast: {
        url: '/dashboards/assets',
        method: 'GET',
        timeout: 1000
    },
    assets: {
        url: '/assets/get-by-ids',
        method: 'POST',
        timeout: 5000
    },
    invallmat_detail: {
        url: '/inventory/',
        method: 'GET',
        timeout: 1000
    },
    invsinglemat_detail: {
        url: '/inventory/entity',
        method: 'GET',
        timeout: 1000
    },
    entity_search: {
        url: '/search/material',
        method: 'GET',
        timeout: 1000
    },
    material_search: {
        url: '/materials/',
        method: 'GET',
        timeout: 1000
    },
    addmessage: {
        url: '/conversation/message',
        method: 'POST',
        timeout: 1000
    },
    getmessages: {
        url: '/conversation/messages',
        method: 'GET',
        timeout: 1000
    },
    create_approval: {
        url: '/order-approvals',
        method: 'POST',
        timeout: 1000
    },
    get_approval: {
        url: '/order-approvals',
        method: 'GET',
        timeout: 1000
    },
    getapproval_detail: {
        url: '/order-approvals/{approval_id}',
        method: 'GET',
        timeout: 1000
    },
    update_approval : {
        url: '/order-approvals/{approval_id}/status',
        method: 'PUT',
        timeout: 1000
    },
    userDevice_addEdit: {
        url: '/user-device/',
        method: 'POST',
        timeout: 1000
    }
};