/**
 * Created by smriti on 31/10/17.
 */

(function(mediaService) {

    var path = require('path'),
        config = require(path.resolve('./conf','')),
        restClient = require(path.resolve('./lib/restclient/restclient',''));

    mediaService.getMedia = function(req, key, callback) {
        var options = {
            url: config.mediaurl + config.mediaConfig.getMedia.url + key,
            method: config.mediaConfig.getMedia.method,
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-real-ip': req.headers['x-real-ip'],
                'x-access-user': req.headers['x-access-user']
            },
            timeout: config.mediaConfig.getMedia.timeout
        };
        restClient.callApi(options, callback);
    }
})(module.exports);