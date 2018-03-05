/**
 * Created by naveensnair on 05/03/18.
 */

var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe('asset configuration test', function() {
    var request, route;
    beforeEach(function () {
        "use strict";
        request = sinon.stub();
        route = proxyquire('../../lib/restclient/restclient.js', {'request': request});
    });
    it("with source", function(done) {
        this.timeout(2000);
        var expectedEndpoint = 'http://localhost:8080/s2/api/configuration';
        var req = {
            url: "http://localhost:8080/s2/api/configuration",
            method: "GET",
            headers: {
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'x-access-user': "naveen"
            },
            qs:{
                type: "asset",
                src: "app"
            }
        };

        var body = JSON.stringify({
            "working_statuses": [
                {
                    "status": 1,
                    "display_name": "Working"
                },
                {
                    "status": 2,
                    "display_name": "Under repair"
                },
                {
                    "status": 3,
                    "display_name": "Beyond repair"
                },
                {
                    "status": 4,
                    "display_name": "Condemned"
                },
                {
                    "status": 5,
                    "display_name": "Stand by"
                },
                {
                    "status": 6,
                    "display_name": "Defrosting"
                }
            ],
            "asset_types": [
                {
                    "id": 1,
                    "name": "Temperature logger",
                    "monitoring_type": 1,
                    "temperature_sensitive": false,
                    "gsm_enabled": true,
                    "manufacturers": [
                        {
                            "id": "berlinger",
                            "name": "Berlinger",
                            "models": [
                                {
                                    "name": "MS",
                                    "sensors": [
                                        {
                                            "name": "A",
                                            "color": "Green",
                                            "monitoring_position": 1
                                        },
                                        {
                                            "name": "B",
                                            "color": "#DAA520",
                                            "monitoring_position": 2
                                        },
                                        {
                                            "name": "C",
                                            "color": "Red",
                                            "monitoring_position": 3
                                        },
                                        {
                                            "name": "D",
                                            "color": "Black",
                                            "monitoring_position": 4
                                        },
                                        {
                                            "name": "E",
                                            "color": "Blue",
                                            "monitoring_position": 5
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "nexleaf",
                            "name": "Nexleaf",
                            "models": [
                                {
                                    "name": "CT5",
                                    "sensors": [
                                        {
                                            "name": "A",
                                            "color": "Green",
                                            "monitoring_position": 1
                                        },
                                        {
                                            "name": "B",
                                            "color": "#DAA520",
                                            "monitoring_position": 2
                                        },
                                        {
                                            "name": "C",
                                            "color": "Red",
                                            "monitoring_position": 3
                                        },
                                        {
                                            "name": "D",
                                            "color": "Black",
                                            "monitoring_position": 4
                                        },
                                        {
                                            "name": "E",
                                            "color": "Blue",
                                            "monitoring_position": 5
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "ILR",
                    "monitoring_type": 2,
                    "temperature_sensitive": true,
                    "gsm_enabled": false,
                    "manufacturers": [
                        {
                            "id": "vestfrost",
                            "name": "Vestfrost"
                        },
                        {
                            "id": "electrolux",
                            "name": "Electrolux"
                        },
                        {
                            "id": "haier",
                            "name": "Haier",
                            "serial_number_validation_regex": "^(19|20)\\d\\d\\-[A-Z]{3}\\-[0-9]{7}$",
                            "model_number_validation_regex": "^[A-Za-z]{3,}.*",
                            "serial_number_format_description": "Eg: 2015-ABC-0001234",
                            "model_number_format_description": "Eg: SystemModifiedSuccessfully"
                        }
                    ],
                    "monitoring_points": [
                        {
                            "monitoring_point": 2,
                            "sensor": "B",
                            "position": "Middle"
                        },
                        {
                            "monitoring_point": 4,
                            "sensor": "D",
                            "position": "Ambient"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Deep freezer",
                    "monitoring_type": 2,
                    "temperature_sensitive": true,
                    "gsm_enabled": false,
                    "manufacturers": [
                        {
                            "id": "vestfrost",
                            "name": "Vestfrost",
                            "serial_number_validation_regex": "^[A-Za-z]{3,}.*",
                            "model_number_validation_regex": "^[A-Za-z]{2}:[A-Za-z0-9]+$",
                            "serial_number_format_description": "Eg: SantJgugugeMfeg",
                            "model_number_format_description": "Eg: CD:Asset100"
                        },
                        {
                            "id": "haier",
                            "name": "Haier"
                        }
                    ],
                    "monitoring_points": [
                        {
                            "monitoring_point": 2,
                            "sensor": "B",
                            "position": "Middle"
                        },
                        {
                            "monitoring_point": 4,
                            "sensor": "D",
                            "position": "Ambient"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Walk-in cooler",
                    "monitoring_type": 2,
                    "temperature_sensitive": true,
                    "gsm_enabled": false,
                    "manufacturers": [
                        {
                            "id": "vestfrost",
                            "name": "Vestfrost"
                        },
                        {
                            "id": "haier",
                            "name": "Haier"
                        }
                    ],
                    "monitoring_points": [
                        {
                            "monitoring_point": 1,
                            "sensor": "A",
                            "position": "Left"
                        },
                        {
                            "monitoring_point": 2,
                            "sensor": "B",
                            "position": "Back"
                        },
                        {
                            "monitoring_point": 3,
                            "sensor": "C",
                            "position": "Front"
                        },
                        {
                            "monitoring_point": 4,
                            "sensor": "D",
                            "position": "Right"
                        },
                        {
                            "monitoring_point": 5,
                            "sensor": "E",
                            "position": "Ambient"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Walk-in freezer",
                    "monitoring_type": 2,
                    "temperature_sensitive": true,
                    "gsm_enabled": false,
                    "manufacturers": [
                        {
                            "id": "vestfrost",
                            "name": "Vestfrost"
                        },
                        {
                            "id": "haier",
                            "name": "Haier"
                        }
                    ],
                    "monitoring_points": [
                        {
                            "monitoring_point": 1,
                            "sensor": "A",
                            "position": "Left"
                        },
                        {
                            "monitoring_point": 2,
                            "sensor": "B",
                            "position": "Back"
                        },
                        {
                            "monitoring_point": 3,
                            "sensor": "C",
                            "position": "Front"
                        },
                        {
                            "monitoring_point": 4,
                            "sensor": "D",
                            "position": "Right"
                        },
                        {
                            "monitoring_point": 5,
                            "sensor": "E",
                            "position": "Ambient"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Fridge",
                    "monitoring_type": 2,
                    "temperature_sensitive": true,
                    "gsm_enabled": false,
                    "manufacturers": [
                        {
                            "id": "haier",
                            "name": "Haier",
                            "serial_number_validation_regex": "^[A-Za-z][A-Za-z0-9]*[0-9]$",
                            "model_number_validation_regex": "^[0-9][0-9\\-:\\_/]+$",
                            "serial_number_format_description": "Eg: W123",
                            "model_number_format_description": "Eg: 123-445664-234"
                        }
                    ],
                    "monitoring_points": [
                        {
                            "monitoring_point": 1,
                            "sensor": "A",
                            "position": "Main"
                        }
                    ]
                }
            ]
        });

        var res = {};
        res.statusCode = 200;
        request.withArgs(expectedEndpoint).yields(null, null, body);
        request.withArgs(req).yields(null, res, body);

        route.callApi(req, function (err, data) {
            expect(err).to.be.null;
            expect(data).to.be.equal(body);
            console.log(data);
            done();
        });
    })
});
