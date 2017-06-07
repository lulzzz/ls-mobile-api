/**
 * Created by yuvaraj on 24/05/17.
 */
'use strict';

module.exports = {
    userDevice_addEdit: {
        url: '/userdevice/',
        method: 'POST',
        timeout: 1000,
        req_pld: 'query'
    },
    userDevice_getToken: {
        url: '/userdevice/gettoken',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    }
}
