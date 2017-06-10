/**
 * Created by smriti on 05/06/17.
 */

module.exports = {
    getMetadata: {
        url: '/orders/data',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    get: {
        url: '/orders/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    getItems: {
        url:'/demand/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    }
};