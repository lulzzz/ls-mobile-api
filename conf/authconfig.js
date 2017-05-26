'use strict';

module.exports = {
    login: {
        url: '/m/auth/login',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    generateotp: {
        url: '/m/auth/generateotp',
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
        url: '/m/auth/resetpassword',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    }
};
