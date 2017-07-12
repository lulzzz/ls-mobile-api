'use strict';

module.exports = {
    server: {
        protocol: "http",
        host: "localhost",
        port: "9000",
        root_path: ""
    },
    asset_alerts: {
        url: '/v2/alarms/recent/',
        method: 'GET',
        timeout: 5000
    },
    asset_detail: {
        url: '/v2/tags/',
        method: 'GET',
        timeout: 5000
    },
    monitored_asset_temp: {
        url: '/v3/temp/',
        method: 'GET',
        timeout: 5000
    },
    monitoring_asset_temp: {
        url: '/v2/temp/',
        method: 'GET',
        timeout: 5000
    }
}