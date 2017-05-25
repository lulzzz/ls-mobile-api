/**
 * Created by yuvaraj on 24/05/17.
 */
'use strict';

module.exports = {
    userDevice_create:{
        url: '/userDevice/create',
        method:'POST',
        timeout:1000,
        req_pld: 'query'
    },
    userDevice_update:{
        url: '/userDevice/update',
        method:'POST',
        timeout:1000,
        req_pld: 'query'
    }
}