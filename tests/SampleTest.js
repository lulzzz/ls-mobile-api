var expect  = require('chai').expect;
var request = require('request');

it('Dashboard Content', function() {
    request('http://localhost:8080' , function(error, response, body) {
        console.log(response.statusCode);
        expect(response.statusCode).to.equal(500);
    });
});