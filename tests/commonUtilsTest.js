/**
 * Created by smriti on 29/08/17.
 */

var path = require('path'),
    utils = require(path.resolve('./lib/utils/common/common-utils','')),
    expect = require('chai').expect;

describe('validates an array/object is null, empty or undefined', function(){
    it('validates array is not null empty', function(done){
        expect(utils.checkNotNullEmptyArray([1,2])).to.equal(true);
        done();
    });

    it('validates array is undefined', function(done){
        expect(utils.checkNotNullEmptyArray(null)).to.equal(false);
        done();
    });

    it('validates array is empty', function(done){
        expect(utils.checkNotNullEmptyArray([])).to.equal(false);
        done();
    });
});