/**
 * Created by smriti on 23/05/17.
 */

module.exports = {
    create: {
        url: '/v1/approvals/',
        method: 'POST',
        timeout: 1000,
        req_pld: 'body'
    },
    get: {
        url: '/v1/approvals',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    put : {
        url: '/v1/approvals/{approval_id}/status',
        method: 'PUT',
        timeout: 1000,
        req_pld: 'body'
    }
};
