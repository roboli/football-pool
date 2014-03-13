var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var supertest = request(app);

describe('Heartbeat API', function(){

  describe('test get', function(){
    it('should respond with 200 for valid resource', function(done){
      supertest
        .get('/heartbeat')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    
    it('should respond with 404 for missing resource', function(done){
      supertest
        .get('/missing')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
});
