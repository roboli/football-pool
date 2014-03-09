var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');

describe('Team API', function(){

  beforeEach(function(done) {
    mongoose.connection.collections.teams.remove(done);
  });

  function hasProperties(obj, exp) {
    expect(obj._id).to.exist;
    expect(obj.name).to.equal(exp.name);
    expect(obj.rank).to.equal(exp.rank);
  }

  describe('test post', function(){
    var team = {
      name: "Brazil",
      rank: 2
    };

    it('should respond with 201 for valid data', function(done){
      request(app)
        .post('/team')
        .send(team)
        .expect('Content-Type', /json/)
        .expect(function(res) { hasProperties(res.body, team); })
        .expect(201, done);
    });

    it('should respond with 400 for invalid data', function(done) {
      var badTeam = {};

      request(app)
        .post('/team')
        .send(badTeam)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test get', function() {
    var id;
    var teams = [
      { name: "Brazil",
	rank: 2 },
      { name: "Spain",
	rank: 1 },
    ];
    
    beforeEach(function(done) {
      mongoose.connection.collections.teams.insert(teams, function(err, results) {
	id = results[0]._id;
	done();
      });
    });

    it('should respond with 200 for get all', function(done){
      request(app)
        .get('/team')
        .expect('Content-Type', /json/)
        .expect(function(res) { hasProperties(res.body[0], teams[0]); })
        .expect(200, done);
    });

    it('should respond with 200 for valid id', function(done) {
      request(app)
        .get('/team/' + id)
        .expect('Content-Type', /json/)
        .expect(function(res) { hasProperties(res.body, teams[0]); })
        .expect(200, done);
    });

    it('should respond with 404 for missing resource', function(done){
      request(app)
        .get('/team/123456789012345678901234')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      request(app)
        .get('/team/434u')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test put', function() {
    var id;
    var team = {
      name: "Brazil",
      rank: 2
    };
    var otherTeam = {
      name: 'Spain',
      rank: 1
    };

    beforeEach(function(done) {
      mongoose.connection.collections.teams.insert(team, function(err, results) {
	id = results[0]._id;
	done();
      });
    });

    it('should respond with 204 for valid id and data', function(done){
      request(app)
        .put('/team/' + id)
        .send(otherTeam)
        .expect('Content-Type', /json/)
        .expect(204)
        .end(function(err, res) {
	  request(app)
            .get('/team/' + id)
            .expect(function(res) { hasProperties(res.body, otherTeam); })
            .end(done);
	});
    });

    it('should respond with 404 for missing resource', function(done){
      request(app)
        .put('/team/123456789012345678901234')
        .send(otherTeam)
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      request(app)
        .put('/team/434u')
        .send(otherTeam)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should respond with 400 for invalid data', function(done){
      request(app)
        .put('/team/' + id)
        .send({ rank: 33 })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test del', function(){
    var id;
    var team = {
      name: "Brazil",
      rank: 2
    };

    beforeEach(function(done) {
      mongoose.connection.collections.teams.insert(team, function(err, results) {
	id = results[0]._id;
	done();
      });
    });
    
    it('should respond with 204 for valid id', function(done){
       request(app)
        .del('/team/' + id)
        .expect(204)
        .end(function(err, res) {
	  if (err) throw err; // Checking for ECONNRESET error
	  request(app)
            .get('/team/' + id)
            .expect('Content-Type', /json/)
            .expect(404, done);
	});
    });

    it('should respond with 404 for missing resource', function(done){
      request(app)
        .del('/team/123456789012345678901234')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      request(app)
        .del('/team/434u')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});
