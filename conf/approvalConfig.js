/**
 * Created by smriti on 23/05/17.
 */

module.exports = {
    create: {
        url: '/order-approvals',
        method: 'POST',
        timeout: 5000,
        req_pld: 'body'
    },
    get: {
        url: '/order-approvals',
        method: 'GET',
        timeout: 5000,
        req_pld: 'query'
    },
    getdetail: {
        url: '/order-approvals/{approval_id}',
        method: 'GET',
        timeout: 5000,
        req_pld: 'query'
    },
    put : {
        url: '/order-approvals/{approval_id}/status',
        method: 'PUT',
        timeout: 5000,
        req_pld: 'body'
    }
};
