/**
 * Created by smriti on 22/11/17.
 */

module.exports = {
    get: {
        url: '/config/domain/general/domains',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    system_config: {
        url: '/configuration',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    }
};