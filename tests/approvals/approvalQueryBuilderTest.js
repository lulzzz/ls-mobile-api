/**
 * Created by smriti on 20/04/18.
 */


var path = require('path'),
    approvalQueryBuilder = require(path.resolve('./lib/builder/approvalQueryBuilder.js', '')),
    expect = require('chai').expect;

describe('Get query params', function () {
    it('Constructs empty query model', function (done) {
        var req = {query: {}, headers: []};
        var approvalQueryModel = require(path.resolve('./model/approvalQueryModel.js'));
        var queryModel = approvalQueryBuilder.getQueryParams(req);
        expect(queryModel).to.be.equal(approvalQueryModel);
        done();
    });
    it('Constructs query model for given filters', function (done) {
        var req = {
            query: {
                approver_id: "system1", requester_id: "system2", status: "cn",
                order_id: "3029478", entity_id: "1344726", embed: true
            }
        };
        req.headers = [];
        req.headers['x-real-ip'] = "67676dghgdh8728";
        req.headers['x-access-user'] = "systemuser";
        var queryModel = approvalQueryBuilder.getQueryParams(req);
        expect(queryModel.approver_id).to.be.equal("system1");
        expect(queryModel.requester_id).to.be.equal("system2");
        expect(queryModel.status).to.be.equal("cn");
        expect(queryModel.order_id).to.be.equal("3029478");
        expect(queryModel.entity_id).to.be.equal("1344726");
        expect(queryModel.embed).to.be.true;
        expect(queryModel.user).to.be.equal("systemuser");
        done();

    });
});