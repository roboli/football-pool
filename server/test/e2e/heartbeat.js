var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');

describe('Heartbeat API', function(){

  describe('test get', function(){
    it('should respond with 200 for valid resource', function(done){
      request(app)
        .get('/heartbeat')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    
    it('should respond with 404 for invalid resource', function(done){
      request(app)
        .get('/missing')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
});
