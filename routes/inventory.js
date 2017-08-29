'use strict';

var path = require('path'),
    router = require(path.resolve('./lib/expressive', '')),
    logger = require(path.resolve('./lib/utils/logger', '')),
    urlDecoder = require(path.resolve('./lib/utils/urldecoder', '')),
    invDetail = require(path.resolve('./lib/restclient/inventory/invdetail', '')),
    queryBuilder = require(path.resolve('./lib/builder/inventoryQueryBuilder', '')),
    commonUtils = require(path.resolve('./lib/utils/common/common-utils', ''));

router.use(function (req, res, next) {
    //changing url to original url as url is getting changed--need to find the reason & fix.
    req.url = urlDecoder.decodeurl(req);
    return next();
});

router.get('/inventory', function (req, res) {

    return new Promise(function (resolve, reject) {
        try {
            validate(req);
        } catch (exception) {
            logger.error(exception);
            reject(exception);
            return;
        }
        var queryModel = queryBuilder.buildInvParams(req);
        invDetail.getInvDetail(queryModel, req, res, function (err, data) {
            if (err) {
                logger.error('Error in inventory stock view: ' + err.message);
                reject(err);
            } else {
                var invData = {};
                data = JSON.parse(data);
                invData.data = [];
                invData.total = data.numFound;
                invData.size = data.size;
                invData.offset = data.offset;
                if (commonUtils.checkNotNullEmptyArray(data.results)) {
                    data.results.forEach(function (data) {
                        var dt = {};
                        dt.mId = data.mId;
                        dt.mnm = data.mnm;
                        dt.eId = data.kId;
                        dt.tc = data.stk;
                        dt.a = data.astk;
                        dt.av = data.atpsk;
                        dt.it = data.tstk;
                        dt.min = data.reord;
                        dt.max = data.max;
                        dt.lu = data.t;
                        dt.se = data.event;
                        dt.enm = data.enm;
                        dt.ed = data.period;
                        dt.loc = {};
                        dt.loc.st = data.em.st;
                        dt.loc.stid = data.em.stid;
                        dt.loc.tlk = data.em.tlk;
                        dt.loc.ctr = data.em.ctr;
                        dt.loc.ctrid = data.em.ctrid;
                        dt.loc.ct = data.em.ct;
                        dt.loc.ctid = data.em.ctid;
                        dt.loc.ds = data.em.ds;
                        dt.loc.dsid = data.em.dsid;
                        invData.data.push(dt);
                    });
                }
                resolve(invData);
            }
        });
    });
});

router.get('/inventory/entity/:entity_id/:material_id', function (req, res) {
    return new Promise(function (resolve, reject) {
        var queryModel = queryBuilder.buildInvDetailParams(req);
        invDetail.getSingleInvDetail(queryModel, req, res, function (err, data) {
            if (err) {
                logger.error('Error in inventory stock view: ' + err.message);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
});

function validate(req) {
    if (commonUtils.checkNull(req.query.entity_id) && commonUtils.checkNull(req.query.material_id)) {
        commonUtils.generateValidationError("One of entity id or material id is required.");
    }
    if (commonUtils.checkNotNullEmpty(req.query.entity_id) && commonUtils.checkNotNullEmpty(req.query.material_id)) {
        commonUtils.generateValidationError("Any one of entity id or material id is required.");
    }
    if (commonUtils.checkNotNullEmpty(req.query.entity_id) && commonUtils.checkNotNullEmpty(req.query.etags)) {
        commonUtils.generateValidationError("Any one of entity id or entity tag is required.");
    }
    if (commonUtils.checkNotNullEmpty(req.query.material_id) && commonUtils.checkNotNullEmpty(req.query.mtags)) {
        commonUtils.generateValidationError("Any one of material id or material tag is required.");
    }
    if (commonUtils.checkNotNullEmpty(req.query.entity_id) && (commonUtils.checkNotNullEmpty(req.query.state) ||
        commonUtils.checkNotNullEmpty(req.query.district) || commonUtils.checkNotNullEmpty(req.query.taluk))) {
        commonUtils.generateValidationError("Any one of entity id or state/district/taluk is required.");
    }
}

module.exports = router.getRouter();
