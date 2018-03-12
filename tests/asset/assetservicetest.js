var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe ('test assets', function () {

    var requeststub, restclientstub;
    beforeEach(function () {

        'use strict';
        requeststub = sinon.stub();
        restclientstub = proxyquire('../../lib/restclient/restclient',{'request':requeststub});
    });

    it('asset detail should return 200', function (done) {

        var options = {
            url: "http://localhost:8080/s2/api/assets/electrolux/2011-DF-30001",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "kumarg"
            },
            timeout: 3000,
            time: true
        };
        var body = JSON.stringify({
            "sno": 0,
            "sdname": "Offline - Guntur District",
            "ons": [
                {
                    "dmn": {
                        "nm": "Offline - Guntur District",
                        "id": 1250430,
                        "loc": {}
                    },
                    "id": "adm_odisha",
                    "tgs": [
                        "CMO"
                    ],
                    "fnm": "admOdisha",
                    "age": 0,
                    "phm": "+91 9611779607",
                    "en": false,
                    "isAdm": false,
                    "lgr": -1,
                    "atexp": 0,
                    "per": "d",
                    "sdid": 1250430,
                    "sdname": "Offline - Guntur District",
                    "theme": 0
                }
            ],
            "mts": [
                {
                    "dmn": {
                        "nm": "Offline - Guntur District",
                        "id": 1250430,
                        "loc": {}
                    },
                    "id": "gunturdstrp",
                    "tgs": [
                        "CCH"
                    ],
                    "fnm": "gunturdstrP",
                    "age": 0,
                    "phm": "+91 213131",
                    "en": false,
                    "isAdm": false,
                    "lgr": -1,
                    "atexp": 0,
                    "per": "d",
                    "sdid": 1250430,
                    "sdname": "Offline - Guntur District",
                    "theme": 0
                }
            ],
            "tags": [
                "1250428",
                "1250428.Andhra Pradesh",
                "1250429",
                "1250429.Andhra Pradesh",
                "1250430",
                "1250430.Andhra Pradesh",
                "1250447",
                "1250447.Andhra Pradesh",
                "kiosk.1353523"
            ],
            "meta": {
                "cc": {
                    "qty": "10",
                    "met": "Litres"
                },
                "dev": {
                    "mdl": "MDL5",
                    "yom": "2015"
                },
                "int": {
                    "cnt": "3"
                }
            },
            "cb": "sarada",
            "ub": "sarada",
            "sns": [],
            "alrm": [
                {
                    "typ": 0,
                    "stat": 0,
                    "time": 1516602550,
                    "code": "-1",
                    "ftime": "22/1/18 11:59 AM"
                },
                {
                    "typ": 0,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 2,
                    "ftime": "22/1/18 12:02 PM"
                },
                {
                    "typ": 0,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 4,
                    "ftime": "22/1/18 12:02 PM"
                },
                {
                    "typ": 1,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 2,
                    "ftime": "22/1/18 12:02 PM"
                },
                {
                    "typ": 1,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 4,
                    "ftime": "22/1/18 12:02 PM"
                },
                {
                    "typ": 2,
                    "stat": 0,
                    "time": 1516602550,
                    "code": "-1",
                    "ftime": "22/1/18 11:59 AM"
                },
                {
                    "typ": 2,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 2,
                    "ftime": "22/1/18 12:02 PM"
                },
                {
                    "typ": 2,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 4,
                    "ftime": "22/1/18 12:02 PM"
                },
                {
                    "typ": 4,
                    "stat": 1,
                    "time": 1516516254,
                    "code": "-1",
                    "ftime": "21/1/18 12:00 PM"
                },
                {
                    "typ": 4,
                    "stat": 1,
                    "time": 1516516254,
                    "code": "-1",
                    "mpId": 2,
                    "ftime": "21/1/18 12:00 PM"
                },
                {
                    "typ": 4,
                    "stat": 1,
                    "time": 1516516254,
                    "code": "-1",
                    "mpId": 4,
                    "ftime": "21/1/18 12:00 PM"
                },
                {
                    "typ": 5,
                    "stat": 0,
                    "time": 1516602550,
                    "code": "-1",
                    "ftime": "22/1/18 11:59 AM"
                },
                {
                    "typ": 5,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 2,
                    "ftime": "22/1/18 12:02 PM"
                },
                {
                    "typ": 5,
                    "stat": 0,
                    "time": 1516602766,
                    "code": "-1",
                    "mpId": 4,
                    "ftime": "22/1/18 12:02 PM"
                }
            ],
            "tmp": [
                {
                    "st": 3,
                    "tmp": 1,
                    "aSt": 1,
                    "time": 1516516254,
                    "stut": 1516603470,
                    "ftime": "21/1/18 12:00 PM",
                    "fstut": "22/1/18 12:14 PM",
                    "isActive": true
                },
                {
                    "st": 3,
                    "tmp": 15,
                    "aSt": 2,
                    "time": 1516516254,
                    "stut": 1516603469,
                    "mpId": 2,
                    "ftime": "21/1/18 12:00 PM",
                    "fstut": "21/1/18 12:00 PM",
                    "isActive": false
                },
                {
                    "st": 3,
                    "tmp": 1,
                    "aSt": 1,
                    "time": 1516516254,
                    "stut": 1516603470,
                    "mpId": 4,
                    "ftime": "21/1/18 12:00 PM",
                    "fstut": "21/1/18 12:00 PM",
                    "isActive": false
                }
            ],
            "ws": {
                "st": 0,
                "stut": 1516602550,
                "fstut": "22/1/18 11:59 AM"
            },
            "typ": 2,
            "mdl": "MDL5",
            "rus": "sarada",
            "lub": "sarada",
            "ts": "22/1/18 11:59 AM",
            "lts": "22/1/18 11:59 AM",
            "rel": {
                "2": {
                    "dId": "2011-TL-300004",
                    "vId": "nexleaf",
                    "sId": "B",
                    "typ": 2,
                    "mpId": 2,
                    "meta": {
                        "warn": {
                            "high": {
                                "dur": "1",
                                "temp": "8.0"
                            },
                            "low": {
                                "dur": "21",
                                "temp": "2.0"
                            }
                        },
                        "dev": {
                            "mdl": "CT5"
                        },
                        "tmp": {
                            "min": "2.0",
                            "max": "8.0"
                        },
                        "alarm": {
                            "high": {
                                "dur": "3",
                                "temp": "8.0"
                            },
                            "low": {
                                "dur": "3",
                                "temp": "2.0"
                            }
                        },
                        "int": {
                            "sint": "10",
                            "pint": "30"
                        }
                    }
                },
                "4": {
                    "dId": "2011-TL-300004",
                    "vId": "nexleaf",
                    "sId": "D",
                    "typ": 2,
                    "mpId": 4,
                    "meta": {
                        "warn": {
                            "high": {
                                "dur": "1",
                                "temp": "8.0"
                            },
                            "low": {
                                "dur": "21",
                                "temp": "2.0"
                            }
                        },
                        "dev": {
                            "mdl": "CT5"
                        },
                        "tmp": {
                            "min": "2.0",
                            "max": "8.0"
                        },
                        "alarm": {
                            "high": {
                                "dur": "3",
                                "temp": "8.0"
                            },
                            "low": {
                                "dur": "3",
                                "temp": "2.0"
                            }
                        },
                        "int": {
                            "sint": "10",
                            "pint": "30"
                        }
                    }
                }
            },
            "iDa": true,
            "iCon": 1516602550000,
            "lubn": "Sarada Akurathi",
            "rusn": "Sarada Akurathi",
            "id": 27868,
            "dId": "2011-DF-30001",
            "vId": "electrolux",
            "entity": {
                "sno": 0,
                "id": 1353523,
                "nm": "District_BD3",
                "ct": "Distric",
                "st": "Andhra Pradesh",
                "ctr": "IN",
                "lt": 0,
                "ln": 0,
                "tlk": "",
                "ds": "",
                "ri": 0,
                "sl": 0,
                "oo": false,
                "osno": 0,
                "be": false,
                "perm": 0,
                "appr": false,
                "ipa": false,
                "isa": false
            },
            "sdid": 1250430
        });
        var res = {};
        res.statusCode = 200;
        requeststub.withArgs(options).yields(null, res, body);
        restclientstub.callApi(options, function (err, data) {
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            done();
        });
    })
});
