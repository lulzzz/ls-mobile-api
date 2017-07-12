'use strict';

var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require("./conf/index"),
    route = require('./routes/index'),
    logger = require('./lib/utils/log'),
    interceptor = require('./lib/interceptor'),
    endpoints = require('./conf/endpoints.json'),
    utils = require('./lib/utils/common/common-utils');

var app = express();
//logging
app.use(require('morgan')({ "stream": logger.stream }));
//to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('x-powered-by', false);


// Bootstrap services
/*for(var i = 0; i < endpoints.length; i++) {

  const endpoint = endpoints[i].service;
  const method = endpoints[i].method;
  const host = endpoints[i].host;
  const port = endpoints[i].port;
  const rootPath = endpoints[i].rootPath || "";
  const protocol = endpoints[i].protocol || "http";

  var middleware;

  console.log('Boostrapping service: ${protocol}://${host}:${port}/${rootPath}');

  if(utils.checkStrictNotNullEmpty(endpoints[i].middleware)) {

    middleware = require('./lib/interceptor/index');
    prepareRouteWithMW(endpoint,method,middleware);
  } else {
    prepareRoute(endpoint,method);
  }
}
*/
function prepareRoute(endpoint,method) {

  switch (method) {
    case 'POST':
      app.post(`${endpoint}*`,function (req,res){
         console.log('hit the endpoint'+`${endpoint}`);
      });
      break;
    case 'GET':
      app.get(`${endpoint}*`,function (req,res){

      });
      break;
    case 'PUT':
      app.put(`${endpoint}*`,function (req,res){

      });
      break;
    default:
      console.log('endpoint with invalid method');

  }
}

function prepareRouteWithMW(endpoint,method,middleware) {
  switch (method) {
    case 'POST':
      app.post(`${endpoint}*`, middleware, function (req, res) {

      });
      break;
    case 'GET':
      app.get(`${endpoint}*`, middleware, function (req, res) {

      });
      break;
    case 'PUT':
      app.put(`${endpoint}*`, middleware, function (req, res) {

      });
      break;
    default:
      console.log('endpoint with invalid method');
  }
}

app.use(function(req,res,next) {
  logger.info("Received request for resource :"+req.url)
  next();
});

//app.use('/',interceptor)

app.use(route);

// 404 handler
// if control reaches here means no
// appropriate req handler not found
app.use(function(req,res) {
  res.status(404).send('Resource Not Found');
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.code || 500);
  res.send(JSON.stringify(err.message));
});

module.exports = app;


