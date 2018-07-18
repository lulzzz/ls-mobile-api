
var path = require('path'),
    assetRespBuilder = require(path.resolve('./lib/builder/assetRespBuilder.js', '')),
    expect = require('chai').expect;


describe('buildAssetDetailModel Test', function () {

    it('returns the asset detail model', function (done) {
        var data = {"sno":0,"sdname":"Default","ons":[],"mts":[],"tags":["1","1.Uttarakhand","1248938","1248938.Uttarakhand","1249893","1249893.Uttarakhand","1250077","1250077.Uttarakhand","kiosk.1347515"],"meta":{"cc":{"qty":"50","met":"Litres"},"dev":{"mdl":"HBC-80"},"int":{"cnt":"3"}},
            "cb":"kani","ub":"naveenc","sns":[],
            "alrm":[{"typ":0,"stat":0,"time":1489563854,"code":"-1","ftime":"15/3/17 1:14 PM"},{"typ":0,"stat":0,"time":1491991847,"code":"-1","mpId":2,"ftime":"12/4/17 3:40 PM"},{"typ":0,"stat":0,"time":1491991847,"code":"-1","mpId":4,"ftime":"12/4/17 3:40 PM"},{"typ":1,"stat":0,"time":1489563854,"code":"-1","ftime":"15/3/17 1:14 PM"},{"typ":1,"stat":0,"time":1491991847,"code":"-1","mpId":2,"ftime":"12/4/17 3:40 PM"},{"typ":1,"stat":0,"time":1491991847,"code":"-1","mpId":4,"ftime":"12/4/17 3:40 PM"},{"typ":2,"stat":0,"time":1489563854,"code":"-1","ftime":"15/3/17 1:14 PM"},{"typ":2,"stat":0,"time":1491991847,"code":"-1","mpId":2,"ftime":"12/4/17 3:40 PM"},{"typ":2,"stat":0,"time":1491991847,"code":"-1","mpId":4,"ftime":"12/4/17 3:40 PM"},{"typ":4,"stat":1,"time":1493278581,"code":"-1","mpId":2,"ftime":"27/4/17 1:06 PM"},{"typ":4,"stat":1,"time":1493278581,"code":"-1","mpId":4,"ftime":"27/4/17 1:06 PM"},{"typ":5,"stat":0,"time":1489563854,"code":"-1","ftime":"15/3/17 1:14 PM"},{"typ":5,"stat":0,"time":1491991847,"code":"-1","mpId":2,"ftime":"12/4/17 3:40 PM"},{"typ":5,"stat":0,"time":1491991847,"code":"-1","mpId":4,"ftime":"12/4/17 3:40 PM"}],
            "tmp":[{"st":0,"tmp":0.0,"aSt":0,"time":0,"stut":1489564818,"mpId":2,"ftime":"1/1/70 5:30 AM","fstut":"27/4/17 1:06 PM","isActive":false},{"st":0,"tmp":0.0,"aSt":0,"time":0,"stut":1489563854,"mpId":4,"ftime":"1/1/70 5:30 AM","fstut":"27/4/17 1:06 PM","isActive":false}],"ws":{"st":0,"stut":1489563854,"fstut":"15/3/17 1:14 PM"},"typ":2,"mdl":"HBC-80","rus":"kani","lub":"naveenc","ts":"15/3/17 1:14 PM","lts":"21/6/18 4:35 PM","uflts":"2018-06-21T16:35:37.000Z","mtyp":2,"rel":{"4":{"dId":"1020-TILR-0000001","vId":"nexleaf","sId":"D","typ":0,"mpId":4,"meta":{"warn":{"high":{"dur":"null","temp":"null"},"low":{"dur":"null","temp":"null"}},"dev":{"mdl":"CT5"},"tmp":{"min":"2.0","max":"5.0"},"alarm":{"high":{"dur":"5","temp":"5.0"},"low":{"dur":"5","temp":"2.0"}},"int":{"sint":"50","pint":"525353535"}}},"2":{"dId":"1020-TILR-0000001","vId":"nexleaf","sId":"B","typ":0,"mpId":2,"meta":{"warn":{"high":{"dur":"null","temp":"null"},"low":{"dur":"null","temp":"null"}},"dev":{"mdl":"CT5"},"tmp":{"min":"2.0","max":"5.0"},"alarm":{"high":{"dur":"5","temp":"5.0"},"low":{"dur":"5","temp":"2.0"}},"int":{"sint":"50","pint":"525353535"}}}},
            "iDa":true,"iCon":1489563854000,"lubn":"Naveen Chander","rusn":"Kani","id":1276,"dId":"Test-NC-003","vId":"haier",
            "entity":{"sno":0,"id":1347515,"nm":"Awdal PHC","ct":"Dehradun","st":"Uttarakhand","ctr":"IN","lt":0.0,"ln":0.0,"tlk":"","ds":"","ri":0,"sl":0,"oo":false,"osno":0,"be":false,"perm":0,"appr":false,"ipa":false,"isa":false},"sdid":1}
        var model = assetRespBuilder.buildAssetDetailModel(data);
        expect(model.serial_no).to.be.equal("Test-NC-003");
        expect(model.manufacturer_code).to.be.equal("haier");
        expect(model.entity.entity_id).to.be.equal(1347515);
        expect(model.entity.name).to.be.equal("Awdal PHC");
        done();
    });
});