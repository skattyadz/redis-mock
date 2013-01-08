var redismock = require("../"),
    should = require("should"),
    events = require("events");

describe("get", function () {

    it("should return the value of an existing key", function(done) {
        var r = redismock.createClient("", "", "");
        r.set("foo1", "bar", function (err, result) {
            r.get("foo1", function (err, result) {
                result.should.equal("bar");
                r.end();
                done();
            });
        });
    });

    it("should return null for a non-existing key", function (done) {
        var r = redismock.createClient("", "", "");
        r.get("does-not-exist", function (err, result) {
            should.not.exist(result);
            r.end();
            done();
        });
    });

});

describe("setex", function () {

    it("should set the key", function (done) {
      var r = redismock.createClient("", "", "");

      r.setex("foo2", 1000, "bar", function (err, result) {
          r.get("foo2", function (err, result) {
              result.should.equal("bar");
              r.end();
              done();
          });
      });
    });

    it("should make key disappear after the set time", function (done) {
        var r = redismock.createClient("", "", "");

        r.setex("foo3", 1, "bar", function (err, result) {
            result.should.equal('OK');

            setTimeout(function () {
                r.exists("foo3", function (err, result) {
                    result.should.equal(0);
                    r.end();
                    done();
                });
            }, 2000);
        });
    });

});