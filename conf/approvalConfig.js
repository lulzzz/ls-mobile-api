/**
 * Created by smriti on 23/05/17.
 */

module.exports = {
    create: {
        url: '/v1/approvals/',
        method: 'POST',
        timeout: 1000,
        req_pld: 'query'
    },
    get: {
        url: '/v1/approvals',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    }
};