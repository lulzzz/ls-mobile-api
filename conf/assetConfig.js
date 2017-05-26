/**
 * Created by smriti on 22/05/17.
 */

module.exports = {
    asset_alerts: {
        url: '/v2/alarms/recent/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    asset_detail: {
        url: '/v2/tags/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    assets: {
        url: '/assets/list',
        method: 'POST',
        timeout: 3000,
        req_pld: 'query'
    },
    monitored_asset_temp: {
        url: '/v3/temp/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    },
    monitoring_asset_temp: {
        url: '/v2/temp/',
        method: 'GET',
        timeout: 1000,
        req_pld: 'query'
    }
};