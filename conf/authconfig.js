'use strict';

module.exports = {
    login: {
        url: '/mauth/login',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    generateotp: {
        url: '/auth/generateotp',
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
        url: '/mauth/changepassword',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    }
};
