/**
 * Created by smriti on 04/12/17.
 */

var redis = require('redis'),
    client = redis.createClient(),
    path = require('path'),
    utils = require(path.resolve('./lib/utils/common/common-utils', ''));

module.exports = {

    getData: function(key, callback) {
        client.get(key, function (err, cachedData) {
            if (err) {
                // do nothing
                callback(err, null);
            } else {
                callback(null, cachedData);
            }
        });
    },

    setData: function(key, data, expiryTime) {
            client.set(key, data);
            client.expire(key, expiryTime);
    }
};