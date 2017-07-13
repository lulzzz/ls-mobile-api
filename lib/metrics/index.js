'use strict';

var path = require('path');
const Prometheus = require('prom-client'),
    logger = require(path.resolve('./lib/utils/log', ''));

const PrometheusMetrics = {
    throughput: new Prometheus.Counter({
        name: "api_throughput",
        help: 'The number of requests served',
        labelNames: ['method', 'status_code', 'route']
    }),
    summary: new Prometheus.Summary({
        name: "api_summary",
        help: "Response times percentiles",
        labelNames: ['method', 'status_code', 'route']
    }),
    histogram: new Prometheus.Histogram({
        name: "api_histograms",
        help: "Response times summary",
        labelNames: ['method', 'status_code', 'route']
    })
};

module.exports = {
    getMetrics: function () {
        return Prometheus.register.metrics();
    },

    incrementCounter: function (method, statusCode, route) {
        PrometheusMetrics.throughput.labels(method, statusCode, route).inc();
    },
    observe: function (method, statusCode, route, timeTaken) {
        PrometheusMetrics.histogram.labels(method, statusCode, route).observe(timeTaken);
        PrometheusMetrics.summary.labels(method, statusCode, route).observe(timeTaken);
    }
};