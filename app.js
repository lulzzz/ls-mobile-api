'use strict';

var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require("./conf/index"),
    route = require('./routes/index'),
    logger = require('./lib/utils/logger'),
    interceptor = require('./lib/interceptor'),
    metrics = require(path.resolve('./lib/metrics', ''));

const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;

// Probe every 5th second.
collectDefaultMetrics({timeout: 5000});

var app = express();
//logging
app.use(require('morgan')(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms ":user-agent"', {"stream": logger.stream}));
//to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('x-powered-by', false);

app.use('/', interceptor);

app.use(route);

// 404 handler
// if control reaches here means no
// appropriate req handler not found
app.use(function(req,res) {
    metrics.incrementCounter(req.method, 404, req.path);
  res.status(404).send('Resource Not Found');
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
    res.status(err.status || 500);
    res.json(err.message);
});

module.exports = app;


