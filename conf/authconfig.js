'use strict';

module.exports = {
    login: {
        url: '/mauth/login',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    generateotp: {
        url: '/auth/generateOtp',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    validateotp: {
        url: '/mauth/validateotp',
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
