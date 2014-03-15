var config = require('./config');
var expect = require('chai').expect;
var Venue = require(config.models_path + 'venue');
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

    it('should save venue without capacity', function(done) {
      var venue = new Venue({ name: 'Maracana', location: 'Rio de Janeiro' });
      venue.save(function(err) {
	expect(err).to.not.exist;
	done();
      });
    });

    it('should return error for saving with bad capacity', function(done) {
      var venue = new Venue({ name: 'Maracana', location: '', capacity: 'hola' });
      venue.save(function(err) {
	expect(err).to.exist;
	done();
      });
    });
  });

  describe('test defaults', function() {
    
    it('should save venue with default capacity cero', function(done) {
      var venue = new Venue({ name: 'Maracana', location: 'Rio de Janeiro' });
      venue.save(function(err) {
	expect(venue.capacity).to.equal(0);
	done();
      });
    });
  });
});
