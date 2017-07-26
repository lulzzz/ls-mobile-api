var router = require('express').Router(),
    pathResolver = require('path'),
    metrics = require(pathResolver.resolve('./lib/metrics', ''));

module.exports = {
    get: function (path, routeHandler) {
        router.get(path, function (req, res) {
            var startTime = (new Date).getTime();
            routeHandler(req, res).then(function (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).json(data);
            }).catch(function (err) {
                res.status(err.status || 500);
                res.json(err.message);
            }).then(function () {
                var timeTaken = ((new Date).getTime() - startTime) / 1000;
                metrics.incrementCounter(req.method, res.statusCode, path);
                metrics.observe(req.method, res.statusCode, path, timeTaken);
            });
        });
    },
    post: function (path, routeHandler) {
       router.post(path, function(req, res) {
          var startTime = (new Date).getTime();
           routeHandler(req,res).then(function (data) {
               var status = res.statusCode;
               res.append('Content-Type', 'application/json');
               res.status(status || 200).json(data);
           }).catch(function (err) {
               res.status(err.status || 500);
               res.json(err.message);
           }).then(function() {
               var timeTaken = ((new Date).getTime() - startTime) / 1000;
               metrics.incrementCounter(req.method, res.statusCode, path);
               metrics.observe(req.method, res.statusCode, path, timeTaken);
           });
       });
    },
    put: function (path, routeHandler) {
        router.put(path, function(req, res) {
            var startTime = (new Date).getTime();
            routeHandler(req,res).then(function (data) {
                res.append('Content-Type', 'application/json');
                res.status(200).json(data);
            }).catch(function (err) {
                res.status(err.status || 500);
                res.json(err.message);
            }).then(function() {
                var timeTaken = ((new Date).getTime() - startTime) / 1000;
                metrics.incrementCounter(req.method, res.statusCode, path);
                metrics.observe(req.method, res.statusCode, path, timeTaken);
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
