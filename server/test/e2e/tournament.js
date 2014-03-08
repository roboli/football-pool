var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var expect = require('chai').expect;

describe('tournament api', function(){

  describe('when requesting resource /tournament', function(){

    function hasProperties(res) {
      var tournament = JSON.parse(res.text);
      expect(tournament.name).to.exist;
      expect(tournament.startDate).to.exist;
      expect(tournament.endDate).to.exist;
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
