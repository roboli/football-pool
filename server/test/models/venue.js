var expect = require('chai').expect;
var db = require('../../lib/db');
var Venue = require('../../lib/models/venue.js');

describe('Venue model', function() {
  describe('test validations', function() {
    it('should save venue', function(done) {
      var venue = new Venue({ name: 'Maracana', location: 'Rio de Janeiro', capacity: 99000 });
      venue.save(function(err) {
	expect(err).to.not.exist;
	done();
      });
    });
  });
});
