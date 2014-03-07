var expect = require('chai').expect;
var db = require('../../lib/db');
var Venue = require('../../lib/models/venue');
var Team = require('../../lib/models/team');
var Match = require('../../lib/models/match');
var mongoose = require('mongoose');
var async = require('async');

describe('Match model', function() {
  var venue;
  var teams = [];

  beforeEach(function(done) {
    var collections = mongoose.connection.collections;

    async.waterfall([
      function(cb) {
	collections.matches.remove(cb);
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
    it('should save match', function(done) {
      var match = new Match({ _venue: venue._id, _home_team: teams[0]._id, _visitor_team: teams[1]._id, date: new Date() });
      match.save(function(err) {
	expect(err).to.not.exist;
	done();
      });
    });

    it('should return error for saving with no venue', function(done) {
      var match = new Match({ _home_team: teams[0]._id, _visitor_team: teams[1]._id, date: new Date() });
      match.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with bad venue', function(done) {
      var match = new Match({ _venue: '13848', _home_team: teams[0]._id, _visitor_team: teams[1]._id, date: new Date() });
      match.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with no home team', function(done) {
      var match = new Match({ _venue: venue._id, _visitor_team: teams[1]._id, date: new Date() });
      match.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with bad home team', function(done) {
      var match = new Match({ _venue: venue._id, _home_team: '3244', _visitor_team: teams[1]._id, date: new Date() });
      match.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });
  });
});
