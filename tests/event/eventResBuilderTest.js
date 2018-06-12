/**
 * Created by smriti on 29/11/17.
 */


var path = require('path'),
    eventResBuilder = require(path.resolve('./lib/builder/eventResBuilder', '')),
    expect = require('chai').expect;

describe('Build event summary', function () {

    it('Constructs response for empty data', function (done) {
        var eventData = {summaries: [], offset: 0, size: 50};
        var data = eventResBuilder.buildEventSummary([], eventData);
        expect(data).to.deep.equal(eventData);
        done();
    });

    it('Constructs event response for data', function (done) {
        var eventData = {
            summaries: [{
                event_type: "data_entry_performance_by_entity",
                category: "activity",
                object_id: 1,
                object_type: "domain",
                tag: "domain",
                event_id: "1144183923",
                text: "Data entered within 2 days of actual date of transaction over last 12 months",
                type: "performance",
                distribution: [
                    {id: "1343726", count: 2}
                ]
            },
                {
                    event_type: "supply_performance",
                    category: "supply",
                    object_id: 2,
                    event_id: "1144183568",
                    text: "Data entered within 2 days of actual date of transaction over last 12 months",
                    type: "performance",
                    distribution: [
                        {id: "1343727", count: 5}, {id: "1343728", count: 1}
                    ]
                }],
            offset: 0,
            size: 50
        };
        var domainData = [
            {
                "domainId": "1343726",
                "cnt": "IN"
            },
            {
                "domainId": "1343728"
            }
        ];
        var data = eventResBuilder.buildEventSummary(domainData, eventData);
        expect(data.offset, undefined);
        expect(data.event_type, "data_entry_performance_by_entity");
        expect(data.summaries[0].distribution[0].count).to.be.equal(2);
        expect(data.summaries[0].distribution[0].id).to.be.equal("1343726");
        expect(data.summaries[0].distribution[0].location.country).to.be.equal("IN");
        expect(data.summaries[0].distribution[0].location.state).to.be.equal("");
        expect(data.summaries[1].distribution[0].id).to.be.equal("1343727");
        expect(data.summaries[1].distribution[0].count).to.be.equal(5);
        expect(data.summaries[1].distribution[0].location).to.be.equal(undefined);
        expect(data.summaries[1].distribution[1].id).to.be.equal("1343728");
        expect(data.summaries[1].distribution[1].location).to.be.equal(undefined);
        done();
    });
});


describe('Get distribution object ids', function () {
    it('Constructs for empty data', function (done) {
        var data = eventResBuilder.getDistributionObjectIds({summaries: [{event_id: 1234}]});
        expect(data, "");
        done();
    });

    it('Constructs ids for valid list', function (done) {
        var data = eventResBuilder.getDistributionObjectIds({
            summaries: [{
                distribution: [{
                    id: 1343726,
                    count: 12
                }, {id: 1343727, count: 5}]
            }]
        });
        expect(data).to.be.equal("1343726,1343727");
        done();
    });
});

describe('Get likes count request payload', function () {
    it('Constructs object for empty data', function (done) {
        var data = eventResBuilder.getLikesCountRequestPayload({headers: {'x-access-user': "system"}}, {
            summaries: [],
            offset: 0,
            size: 50
        });
        var response = {likes: [], user: "system"};
        expect(data.user).to.be.equal(response.user);
        done();
    });
    it('Constructs request object for event summary data', function (done) {
        var eventData = {
            summaries: [{
                event_id: 1,
                object_id: 123,
                object_type: "domain"
            },
                {
                    event_id: 2,
                    object_id: 234,
                    object_type: "kiosk"
                }
            ],
            offset: 0,
            size: 50
        };
        var data = eventResBuilder.getLikesCountRequestPayload({headers: {'x-access-user': "smriti"}}, eventData);
        expect(data.likes.size, 2);
        console.log("data: " + data.likes[0].context_id);
        expect(data.likes[0].contextId).to.be.equal(1);
        expect(data.likes[0].objectId).to.be.equal(123);
        expect(data.likes[0].objectType).to.be.equal("domain");
        expect(data.likes[1].contextId).to.be.equal(2);
        expect(data.likes[1].objectId).to.be.equal(234);
        expect(data.likes[1].objectType).to.be.equal("kiosk");
        done();
    });
});

describe('Build like count response', function () {
    it('\n Constructs response model for empty data', function (done) {
        var eventData = {summaries: []};
        var resModel = eventResBuilder.buildLikeCountResponse(eventData, []);
        expect(resModel.summaries).to.be.equal(eventData.summaries);
        done();
    });

    it('\n Constructs response model with params', function (done) {
        var eventData = {};
        eventData.summaries = [{
            object_id: 1,
            object_type: "activity",
            event_id: 1234378
        },
            {
                object_id: 2,
                object_type: "supply",
                event_id: 1453526
            }];

        var collaborationData = {};
        collaborationData.likes = [{
            objectId: 2,
            objectType: "supply",
            contextId: 1453526,
            count: 5,
            liked: true
        }];
        var resModel = eventResBuilder.buildLikeCountResponse(eventData, collaborationData);
        expect(resModel.summaries[0].like).to.be.an('undefined');
        expect(resModel.summaries[1].like.like_count).to.be.equal(5);
        expect(resModel.summaries[1].like.liked).to.be.true;
        done();
    });
});

