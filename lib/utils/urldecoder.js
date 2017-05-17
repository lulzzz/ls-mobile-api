(function decodeUrl(urldecoder) {
    'use strict';

    urldecoder.decodeurl = function(req) {
        var url = req.originalUrl;
        if (url.indexOf('?') == -1) {
            req.url = url;
        } else {
            req.url = url.substring(0, url.indexOf('?'));
        }
        return req.url;
    }
})(module.exports);
