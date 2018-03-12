/*
 * Copyright © 2018 Logistimo.
 *
 * This file is part of Logistimo.
 *
 * Logistimo software is a mobile & web platform for supply chain management and remote temperature monitoring in
 * low-resource settings, made available under the terms of the GNU Affero General Public License (AGPL).
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 *
 * You can be released from the requirements of the license by purchasing a commercial license. To know more about
 * the commercial license, please contact us at opensource@logistimo.com
 */

/**
 * Created by naveensnair on 23/02/18.
 */

'use strict'

var path = require("path"),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    domainConfigService = require(path.resolve('./lib/restclient/domain/domainCfgService', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    Promise = require('bluebird'),
    utils = require(path.resolve('./lib/utils/common/common-utils', ''));

    router.use(function (req, res, next) {
        req.url = urlDecoder.decodeurl(req);
        return next();
    });

    router.get('/configurations/assets', function(req) {
       return new Promise(function(resolve, reject) {
           if(utils.checkNullEmpty(req.query.src)) {
               logger.warn("Source is required");
               reject(utils.generateValidationError("Source id is required."));
               return;
           }
           domainConfigService.getAssetSystemConfig(req, function(err, data) {
               if (err) {
                   logger.error("Error while fetching the asset system configuration" + "\n" + err.stack);
                   reject(err);
               } else {
                   resolve(JSON.parse(data));
               }
           })
       })
    });

    module.exports = router.getRouter();