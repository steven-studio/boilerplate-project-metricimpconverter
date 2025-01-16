const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('GET /api/convert', function() {

    test('Convert 10L (valid input)', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });

    test('Convert an invalid input such as 32g', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'invalid unit');
          done();
        });
    });

    test('Convert an invalid number such as 3/7.2/4kg', function(done) {
      chai.request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'invalid number');
          done();
        });
    });

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done) {
      chai.request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'invalid number and unit');
          done();
        });
    });

    test('Convert with no number such as kg', function(done) {
      chai.request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1); // 默认值为 1
          assert.equal(res.body.initUnit, 'kg');
          assert.equal(res.body.returnNum, 2.20462);
          assert.equal(res.body.returnUnit, 'lbs');
          assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
          done();
        });
    });

  });

});