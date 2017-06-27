'use strict';

module.exports = {
    login: {
        url: '/mauth/login',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    generateotp: {
        url: '/auth/generateoTp',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    validateotp: {
        url: '/m/auth/validateotp',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    resetpassword: {
        url: '/mauth/change-password',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    }
};
