/**
 * Created by smriti on 22/11/17.
 */

(function (eventResBuilder) {

    var path = require('path'),
        utils = require(path.resolve('./lib/utils/common/common-utils', ''));
    eventResBuilder.buildEventSummary = function (domainConfig, eventData) {
        if (utils.checkNotNullEmptyArray(domainConfig)) {
            eventData.summaries.forEach(function (summary) {
                if (summary.tag == "domain") {
                    summary.distribution.forEach(function (distribution) {
                        domainConfig.some(function (config) {
                            if (config.domainId == distribution.id) {
                                distribution.location = constructLocationResponse(config);
                            }
                        });
                    });
                }
            });
        }
        return eventData;

    };
    eventResBuilder.getDistributionObjectIds = function (eventData) {
        var domainIds = "";
        eventData.summaries.forEach(function (event) {
            if (utils.checkNotNullEmpty(event.distribution)) {
                event.distribution.forEach(function (distribution) {
                    if (utils.checkNotNullEmpty(domainIds)) {
                        domainIds = domainIds + ",";
                    }
                    domainIds = domainIds + distribution.id;
                });
            }
        });
        return domainIds;
    };

    function constructLocationResponse(config) {
        return {
            country: config.cnt || "",
            state: config.st || "",
            district: config.ds || ""
        }
    }
})
(module.exports);