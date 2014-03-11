var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var expect = require('chai').expect;
var supertest = request(app);

describe('Tournament API', function(){

  describe('test get', function(){

    function hasProperties(res) {
      expect(res.body.data.name).to.exist;
      expect(res.body.data.startDate).to.exist;
      expect(res.body.data.endDate).to.exist;
    }
    
    it('should respond with 200', function(done){
      supertest
        .get('/tournament')
        .expect('Content-Type', /json/)
        .expect(hasProperties)
        .expect(200, done);
    });
  });
});
