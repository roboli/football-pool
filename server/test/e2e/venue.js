var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');

describe('venue api', function(){

  beforeEach(function(done) {
    mongoose.connection.collections.venues.remove(done);
  });

  describe('when creating a new resource /venue', function(){
    var venue = {
      name: "Maracana",
      location: "Rio de Janeiro",  
      capacity: 99000
    };

    function hasProperties(res) {
      expect(res.body._id).to.exist;
      expect(res.body.name).to.equal(venue.name);
      expect(res.body.location).to.equal(venue.location);
      expect(res.body.capacity).to.equal(venue.capacity);
    }
    
    it('should respond with 201', function(done){
      request(app)
        .post('/venue')
        .send(venue)
        .expect('Content-Type', /json/)
        .expect(hasProperties)
        .expect(201, done);
    });

    it('should respond with 400 for invalid post', function(done) {
      var badVenue = {};

      request(app)
        .post('/venue')
        .send(badVenue)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});
