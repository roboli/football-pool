var expect = require('chai').expect;
var db = require('../../lib/db');
var Team = require('../../lib/models/team');
var mongoose = require('mongoose');

describe('Team model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.teams.remove(done);
  });
  
  describe('test validations', function() {
    it('should save team', function(done) {
      var team = new Team({ name: 'Brazil', rank: 2 });
      team.save(function(err) {
	expect(err).to.not.exist;
	done();
      });
    });
  });
});
