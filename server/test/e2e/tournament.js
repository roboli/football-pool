var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var expect = require('chai').expect;

describe('tournament api', function(){

  describe('when requesting resource /tournament', function(){

    function hasProperties(res) {
      expect(res.body.name).to.exist;
      expect(res.body.startDate).to.exist;
      expect(res.body.endDate).to.exist;
    }
    
    it('should respond with 200', function(done){
      request(app)
        .get('/tournament')
        .expect('Content-Type', /json/)
        .expect(hasProperties)
        .expect(200, done);
    });
  });
});
