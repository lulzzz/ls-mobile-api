/**
 * Created by smriti on 29/08/17.
 */

var path = require('path'),
    utils = require(path.resolve('./lib/utils/common/common-utils', '')),
    expect = require('chai').expect;

describe('validates an array is null, empty or undefined', function () {
    it('validates for defined array', function (done) {
        expect(utils.checkNotNullEmptyArray([1, 2])).to.equal(true);
        done();
    });

    it('validates for undefined', function (done) {
        expect(utils.checkNotNullEmptyArray(null)).to.equal(false);
        done();
    });

    it('validates for empty', function (done) {
        expect(utils.checkNotNullEmptyArray([])).to.equal(false);
        done();
    });
});
describe("validates an object is null empty or undefined", function () {
    it('validates for empty data', function (done) {
        expect(utils.checkNullEmptyObject({})).to.equal(true);
        done();
    });

    it('validates for undefined data', function (done) {
        expect(utils.checkNullEmptyObject(null)).to.equal(true);
        done();
    });

    it('validates for defined object', function (done) {
        expect(utils.checkNullEmptyObject({total: 0})).to.equal(false);
        done();
    });
});

describe("validates data is null, empty or undefined", function () {
    it('validates for null', function (done) {
        expect(utils.checkNotNullEmpty(null)).to.equal(false);
        done();
    });

    it('validates for undefined', function (done) {
        expect(utils.checkNotNullEmpty(undefined)).to.equal(false);
        done();
    });

    it('validates for empty', function (done) {
        expect(utils.checkNotNullEmpty("")).to.equal(false);
        done();
    });

    it('validates for defined data', function (done) {
        expect(utils.checkNotNullEmpty("Data")).to.equal(true);
        done();
    });
});

describe("validates add single quote", function () {
    it('validates for null', function (done) {
        expect(utils.addSingleQuote()).to.equal(undefined);
        done();
    });

    it('validates for empty data', function (done) {
        expect(utils.addSingleQuote("")).to.equal(undefined);
        done();
    });

    it('validates for a string', function (done) {
        expect(utils.addSingleQuote("Lucknow, Allahabad, Varanasi")).to.equal("'Lucknow',' Allahabad',' Varanasi'");
        done();
    });
});

describe("data is null,empty or undefined", function () {
    it('validates null', function (done) {
        expect(utils.checkNullEmpty(null)).to.equal(true);
        done();
    });
    it('validates empty', function (done) {
        expect(utils.checkNullEmpty()).to.equal(true);
        done();
    });
    it('validates undefined', function (done) {
        expect(utils.checkNullEmpty(undefined)).to.equal(true);
        done();
    });
    it('validates for defined data', function (done) {
        expect(utils.checkNullEmpty("data")).to.equal(false);
        done();
    });
});
describe("data type is object", function () {
    it('validates for empty value', function (done) {
        expect(utils.checkIsObject()).to.equal(false);
        done();
    });
    it('validates for an array', function (done) {
        expect(utils.checkIsObject([])).to.equal(true);
        done();
    });
    it('validates for an object', function (done) {
        expect(utils.checkIsObject({})).to.equal(true);
        done();
    });
    it('validates for a string', function (done) {
        expect(utils.checkIsObject("abc")).to.equal(false);
        done();
    });
});
