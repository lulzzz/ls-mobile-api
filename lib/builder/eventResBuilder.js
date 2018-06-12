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

    eventResBuilder.getLikesCountRequestPayload = function (req, eventData) {
        var requestObject = [];
        eventData.summaries.forEach(function (summary) {
            requestObject.push({
                objectId: summary.object_id,
                objectType: summary.object_type,
                contextId: summary.event_id
            });
        });
        return {
            likes: requestObject, user: req.headers["x-access-user"]
        }
    };

    eventResBuilder.buildLikeCountResponse = function (eventData, collaborationData) {
        if (utils.checkNotNull(collaborationData) && utils.checkNotNullEmptyArray(collaborationData.likes)) {
            eventData.summaries.forEach(function (summary) {
                collaborationData.likes.some(function (data) {
                    if (summary.object_id == data.objectId && summary.object_type == data.objectType && summary.event_id == data.contextId) {
                        summary.like = {like_count: data.count, liked: data.liked};
                        return true;
                    }
                });
            });
        }
        return eventData;
    }
})(module.exports);