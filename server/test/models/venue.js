var expect = require('chai').expect;
var db = require('../../lib/db');
var Venue = require('../../lib/models/venue.js');
var mongoose = require('mongoose');

describe('Venue model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.venues.remove(done);
  });
  
  describe('test validations', function() {
    it('should save venue', function(done) {
      var venue = new Venue({ name: 'Maracana', location: 'Rio de Janeiro', capacity: 99000 });
      venue.save(function(err) {
	expect(err).to.not.exist;
	done();
      });
    });

    it('should return error for saving without name', function(done) {
      var venue = new Venue({ location: 'Rio de Janeiro', capacity: 99000 });
      venue.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with empty name', function(done) {
      var venue = new Venue({ name: '', location: 'Rio de Janeiro', capacity: 99000 });
      venue.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });
       
    it('should return error for saving without location', function(done) {
      var venue = new Venue({ name: 'Maracana', capacity: 99000 });
      venue.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });

    it('should return error for saving with empty location', function(done) {
      var venue = new Venue({ name: 'Maracana', location: '', capacity: 99000 });
      venue.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });
  });
});
