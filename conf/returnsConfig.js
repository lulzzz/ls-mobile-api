/**
 * Created by yuvaraj on 12/03/18.
 */

'use strict';

module.exports = {
    create_returns: {
        url: '/returns',
        method: 'POST',
        timeout: 30000,
        req_pld: 'query'
    },
    update_return: {
        url: '/returns/',
        method: 'POST',
        timeout: 30000,
        req_pld: 'query'
    },
    get_return: {
        url: '/returns/',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    }
};