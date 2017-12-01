/**
 * Created by smriti on 29/11/17.
 */


var path = require('path'),
    eventResBuilder = require(path.resolve('./lib/builder/eventResBuilder', '')),
    expect = require('chai').expect,
    sinon = require('sinon'),
    mocha = require('mocha');

describe('Constructs the event summary response for domain level', function () {

    it('Construct for empty data', function (done) {
        var eventData = {summaries: [], offset: 0, size: 50};
        var data = eventResBuilder.buildEventSummary([], eventData);
        expect(data, {summaries: []});
        done();
    });

    it('Constructs event response', function (done) {
        var eventData = {
            summaries: [{
                event_type: "data_entry_performance_by_entity",
                category: "activity",
                event_id: "1144183923",
                text: "Data entered within 2 days of actual date of transaction over last 12 months",
                type: "performance",
                distribution: [
                    {id: "1343726", count: 2}
                ]
            }],
            offset: 0,
            size: 50
        };
        var domainData = [
            {
               "domainId": "1343726",
                "cnt": "IN"
            }
        ];
        var data = eventResBuilder.buildEventSummary(domainData, eventData);
        expect(data.offset, undefined);
        console.log("smriti");
        console.log(data.summaries[0].distribution[0]);
        expect(data.event_type, "data_entry_performance_by_entity");
        expect(data.summaries[0].distribution[0].contacts, []);
        expect(data.summaries[0].distribution[0].count, 2);
        expect(data.summaries[0].distribution[0].domainId, 1343726);
        expect(data.summaries[0].distribution[0].id, 1343726);
        done();
    });
});


describe('Constructs ids from distribution list', function() {
    it('Constructs for empty Data', function(done) {
        var data = eventResBuilder.getDistributionObjectIds({ summaries: [{event_id: 1234}]});
        expect(data, "");
        done();
    });

    it('Constructs ids for valid list', function(done) {
        var data = eventResBuilder.getDistributionObjectIds({ summaries: [{ distribution: [{id: 1343726, count: 12}, {id: 1343727, count: 5}]}]});
        expect(data, "1343726,1343727");
        done();
    });
});

