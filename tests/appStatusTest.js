/**
 * Created by smriti on 05/09/17.
 */

var path = require('path'),
    expect = require('chai').expect,
    fs = require('fs'),
    statusFilePath = path.resolve('./routes','');

describe('identifies the status of the app', function () {

    it('file not exists on the specified path', function (done) {
        var filePath = statusFilePath + '/abc.txt';
        console.log("\n path file:" + filePath);
        expect(fs.existsSync(filePath)).to.equal(false);
        done();
    });

    it('file exists on the specified path', function (done) {
        var filePath = statusFilePath + '/abc.txt';
        fs.createWriteStream(filePath);
        expect(fs.existsSync(filePath)).to.equal(true);
        fs.unlinkSync(filePath);
        done();
    });
});
