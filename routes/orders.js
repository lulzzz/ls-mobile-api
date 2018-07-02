/**
 * Created by yuvaraj on 25/06/18.
 */

'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    queryBuilder = require(path.resolve('./lib/builder/orderQueryBuilder', '')),
    orderService = require(path.resolve('./lib/restclient/orders/orderService', '')),
    utils = require(path.resolve('./lib/utils/common/common-utils')),
    respBuilder = require(path.resolve('./lib/builder/orderResponseBuilder', ''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/orders', function (req, res) {

    return new Promise(function (resolve, reject) {

        try{
            validateMandatoryParams(req);
        } catch(exception) {
            logger.warn(exception);
            reject(exception);
            return;
        }
        var queryModel = queryBuilder.buildQueryParams(req);
        orderService.getOrders(queryModel, function (err, data) {
            if (err) {
                logger.error('Error in getting orders list ' + err);
                reject(err);
            } else {
                var ordersData = respBuilder.buildOrderList(data);
                resolve(ordersData);
            }
        });
    });

});

function validateMandatoryParams(req) {
    if(utils.checkNullEmpty(req.query.entity_id)) {
        utils.generateValidationError("Kiosk id is mandatory.");
    }
    if(utils.checkNullEmpty(req.query.order_type)) {
        utils.generateValidationError("Order type is mandatory.");
    }
}

module.exports = router.getRouter();