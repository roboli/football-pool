var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var async = require('async');

describe('Game API', function(){
  var _venue;
  var _home_team;
  var _away_team;

  beforeEach(function(done) {
    var collections = mongoose.connection.collections;
    var _ven = _venue;
    
    async.waterfall([
      function(cb) {
	collections.games.remove(cb);
      },
      function(affected, cb) {
	collections.teams.remove(cb);
      },
      function(affected, cb) {
	collections.venues.remove(cb);
      },
      function(affected, cb) {
	collections.venues.insert({ name: 'Camp Noue', location: 'Barcelona', capacity: 98000 }, cb);
      },
      function(results, cb) {
	_venue = results[0]._id;
	collections.teams.insert({ name: 'Brazil', rank: 2 }, cb);
      },
      function(results, cb) {
	_home_team = results[0]._id;
	collections.teams.insert({ name: 'Spain', rank: 1 }, cb);
      },
      function(results, cb) {
	_away_team = results[0]._id;
	cb();
      }
    ], done);
  });

  function hasProperties(obj, exp) {
    expect(obj._id).to.exist;
    expect(obj._venue).to.equal(exp._venue.toString());
    expect(obj._home_team).to.equal(exp._home_team.toString());
    expect(obj._away_team).to.equal(exp._away_team.toString());
    expect(obj.date).to.equal(exp.date.toISOString());
  }

  describe('test post', function(){

    it('should respond with 201 for valid data', function(done){
      var game = {
	"_venue": _venue,
	"_home_team": _home_team,
	"_away_team": _away_team,
	"date": new Date('2014-06-01T13:00:00-03:00')
      };

      request(app)
        .post('/game')
        .send(game)
        .expect('Content-Type', /json/)
        .expect(function(res) { hasProperties(res.body, game); })
        .expect(201, done);
    });

    it('should respond with 400 for invalid data', function(done) {
      var badGame = {};

      request(app)
        .post('/game')
        .send(badGame)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test get', function() {
    var id;
    var games = [];
    
    beforeEach(function(done) {
      games = [
	{ "_venue": _venue,
	  "_home_team": _home_team,
	  "_away_team": _away_team,
	  "date": new Date('2014-06-01T13:00:00-03:00') },
	{ "_venue": _venue,
	  "_home_team": _away_team,
	  "_away_team": _home_team,
	  "date": new Date('2014-07-01T15:00:00-03:00') }
      ];

      mongoose.connection.collections.games.insert(games, function(err, results) {
	id = results[0]._id;
	done();
      });
    });

    it('should respond with 200 for get all', function(done){
      request(app)
        .get('/game')
        .expect('Content-Type', /json/)
        .expect(function(res) { expect(res.body[1]._home_team._id).to.equal(games[1]._home_team.toString()); })
        .expect(200, done);
    });

    it('should respond with 200 for valid id', function(done) {
      request(app)
        .get('/game/' + id)
        .expect('Content-Type', /json/)
        .expect(function(res) { expect(res.body._home_team._id).to.equal(games[0]._home_team.toString()); })
        .expect(200, done);
    });

    it('should respond with 404 for missing resource', function(done){
      request(app)
        .get('/game/123456789012345678901234')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      request(app)
        .get('/game/434u')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test put', function() {
    var id;
    var game;
    var otherGame;

    beforeEach(function(done) {
      game = {
	"_venue": _venue,
	"_home_team": _home_team,
	"_away_team": _away_team,
	"date": new Date('2014-06-01T13:00:00-03:00')
      };
      otherGame = {
	"_venue": _venue,
	"_home_team": _away_team,
	"_away_team": _home_team,
	"date": new Date('2014-07-01T15:00:00-03:00')
      };

      mongoose.connection.collections.games.insert(game, function(err, results) {
	id = results[0]._id;
	done();
      });
    });

    it('should respond with 204 for valid id and data', function(done){
      request(app)
        .put('/game/' + id)
        .send(otherGame)
        .expect(204)
        .end(function(err, res) {
	  request(app)
            .get('/game/' + id)
            .expect(function(res) { expect(res.body._home_team._id).to.equal(otherGame._home_team.toString()); })
            .end(done);
	});
    });

    it('should respond with 404 for missing resource', function(done){
      request(app)
        .put('/game/123456789012345678901234')
        .send(otherGame)
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      request(app)
        .put('/game/434u')
        .send(otherGame)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should respond with 400 for invalid data', function(done){
      request(app)
        .put('/game/' + id)
        .send({ date: '33ha' })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test del', function(){
    var id;

    beforeEach(function(done) {
      var game = {
	"_venue": _venue,
	"_home_team": _home_team,
	"_away_team": _away_team,
	"date": new Date('2014-06-01T13:00:00-03:00')
      };
      
      mongoose.connection.collections.games.insert(game, function(err, results) {
	id = results[0]._id;
	done();
      });
    });
    
    it('should respond with 204 for valid id', function(done){
       request(app)
        .del('/game/' + id)
        .expect(204)
        .end(function(err, res) {
	  if (err) throw err; // Checking for ECONNRESET error
	  request(app)
            .get('/game/' + id)
            .expect('Content-Type', /json/)
            .expect(404, done);
	});
    });

    it('should respond with 404 for missing resource', function(done){
      request(app)
        .del('/game/123456789012345678901234')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      request(app)
        .del('/game/434u')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});
