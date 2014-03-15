var config = require('./config');
var expect = require('chai').expect;
var Venue = require(config.models_path + 'venue');
var Team = require(config.models_path + 'team');
var Game = require(config.models_path + 'game');
var mongoose = require('mongoose');
var async = require('async');

describe('Game model', function() {
  var venue;
  var teams = [];

  beforeEach(function(done) {
    var collections = mongoose.connection.collections;

    async.waterfall([
      function(cb) {
	collections.games.remove(cb);
      },
      function(affected, cb) {
	collections.venues.remove(cb);
      },
      function(affected, cb) {
	collections.teams.remove(cb);
      },
      function(affected, cb) {
	venue = new Venue({ name: 'Maracana', location: 'Rio de Janeiro', capacity: 99000 });
	venue.save(cb);
      },
      function(obj, affected, cb) {
	teams[0] = new Team({ name: 'Brazil', rank: 2 });
	teams[0].save(cb);
      },
      function(obj, affected, cb) {
	teams[1] = new Team({ name: 'Spain', rank: 1 });
	teams[1].save(cb);
      }
    ], done);
  });
  
  describe('test validations', function() {
    
    it('should save game', function(done) {
      var game = new Game({ _venue: venue._id, _home_team: teams[0]._id, _away_team: teams[1]._id, date: new Date() });
      game.save(function(err) {
	expect(err).to.not.exist;
	done();
      });
    });

    it('should return error for saving with no venue', function(done) {
      var game = new Game({ _home_team: teams[0]._id, _away_team: teams[1]._id, date: new Date() });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with bad venue', function(done) {
      var game = new Game({ _venue: '13848', _home_team: teams[0]._id, _away_team: teams[1]._id, date: new Date() });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with no home team', function(done) {
      var game = new Game({ _venue: venue._id, _away_team: teams[1]._id, date: new Date() });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with bad home team', function(done) {
      var game = new Game({ _venue: venue._id, _home_team: '3244', _away_team: teams[1]._id, date: new Date() });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with no away team', function(done) {
      var game = new Game({ _venue: venue._id, _home_team: teams[1]._id, date: new Date() });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with bad away team', function(done) {
      var game = new Game({ _venue: venue._id, _home_team: teams[0]._id, _away_team: '483949', date: new Date() });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with no date', function(done) {
      var game = new Game({ _venue: venue._id, _home_team: teams[0]._id, _away_team: teams[1]._id });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with bad date', function(done) {
      var game = new Game({ _venue: venue._id, _home_team: teams[0]._id, _away_team: teams[1]._id, date: '43489hola' });
      game.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });
  });
});
