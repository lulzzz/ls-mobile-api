'use strict';

module.exports = {
    login: {
        url: '/mauth/login',
        method: 'POST',
        timeout: 30000,
        req_pld: 'body'
    },
    generateotp: {
        url: '/auth/generateOtp',
        method: 'POST',
        timeout: 30000,
        req_pld: 'body'
    },
    validateotp: {
        url: '/mauth/validateotp',
        method: 'POST',
        timeout: 30000,
        req_pld: 'body'
    },
    resetpassword: {
        url: '/mauth/change-password',
        method: 'POST',
        timeout: 30000,
        req_pld: 'body'
    },
    loginV1: {
        url: '/mauth/login/v1',
        method: 'POST',
        timeout: 30000,
        req_pld: 'body'
    },
    generate2FAOTP: {
        url: '/mauth/generate-authentication-otp',
        method: 'POST',
        timeout: 30000,
        req_pld: 'body'
    }
};
