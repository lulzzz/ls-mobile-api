'use request';


const request = require('request');
/*var config = require("./conf/index");
const baseurl = config.logistimoapi.baseurl;*/
var uuid = require('uuid')


/*const options = {
    url: 'http://localhost:8080/s2/api/v2/auth/login',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'X-request-id': uuid()
    },
    body:{'userId':'kumarg','password':'123456','langugae':'en'},
    json:true
};

request(options, function(err, res, body) {
    debugger
    if (err) {
        console.log(err);
    }
    let json = JSON.parse(body);
    console.log("res headers: "+ res.headers+"\n");
    console.log("res cookies: "+ res.cookies+"\n");
    console.log(json);
}*/

var options = {
    url: 'http://localhost:8080/s2/api/m/auth/validatetoken',
    headers: {
        'Accept-Charset': 'utf-8'
    },
    body: '46fc04d7a3bc4a74a7b7efd44dd29e1b',
    json:true,
    timedOut: 1000
};
//here call to logistimo api for login

var status;
request.post(options, function (err, response, body) {
    status = response.statusCode;
    if (err) {
        console.log(err);
    }
    if (body) {
        console.log(body);
    }
    console.log("res headers: " + response.headers + "\n");
    console.log("res cookies: " + response.cookies + "\n");
    if (status != null && status == 200 || status == 201) {
        return true;
    }
    else {
        return false;
    }
});