var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require("./conf/index");
var route = require('./routes/index');
var logger = require('./lib/utils/log');
var interceptor = require('./lib/interceptor');
//var rs = require('./lib/restclient/index')
var app = express();

app.use(require('morgan')({ "stream": logger.stream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('x-powered-by', false);

app.use(function(req,res,next) {
  logger.info("Received request for resource :"+req.url)
  next();
});

app.use('/',interceptor)

app.use(route);

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(JSON.stringify(err.message));
});



/*var server = app.listen(3000, function () {
  logger.info("Environment is :"+app.get('env'))
  logger.info("Example app listening on port 3000!");
})*/

module.exports = app;


