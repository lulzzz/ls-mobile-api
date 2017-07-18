var router = require('express').Router(),
    path = require('path'),
    metrics = require(path.resolve('./lib/metrics', ''));

module.exports = {
    get: function (path, routeHandler) {
        router.get(path, function (req, res) {
            var startTime = (new Date).getTime();
            routeHandler(req, res).then(function (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).send(data);
            }).catch(function (err) {
                res.status(err.status || 500);
                res.json(err.message);
            }).then(function () {
                var timeTaken = ((new Date).getTime() - startTime) / 1000;
                metrics.incrementCounter(req.method, res.statusCode, req.url);
                metrics.observe(req.method, res.statusCode, req.url, timeTaken);
            });
        });
    },
    post: function (path, routeHandler) {
       router.post(path, function(req, res) {
          var startTime = (new Date).getTime();
           routeHandler(req,res).then(function (data) {
              res.append('Content-Type', 'application/json');
               res.status(200).send(data);
           }).catch(function (err) {
               res.status(err.status || 500);
               res.json(err.message);
           }).then(function() {
               var timeTaken = ((new Date).getTime() - startTime) / 1000;
               metrics.incrementCounter(req.method, res.statusCode, req.url);
               metrics.observe(req.method, res.statusCode, req.url, timeTaken);
           });
       });
    },
    put: function (path, routeHandler) {
        router.put(path, function(req, res) {
            var startTime = (new Date).getTime();
            routeHandler(req,res).then(function (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).send(data);
            }).catch(function (err) {
                res.status(err.status || 500);
                res.json(err.message);
            }).then(function() {
                var timeTaken = ((new Date).getTime() - startTime) / 1000;
                metrics.incrementCounter(req.method, res.statusCode, req.url);
                metrics.observe(req.method, res.statusCode, req.url, timeTaken);
            });
        });
    },
    use: function (handler) {
        router.use(function (req, res, next) {
            return handler(req, res, next);
        });
    },
    getRouter: function () {
        return router;
    }
};
