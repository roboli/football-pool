var config = require('./config');
var app = require(config.root_path + 'app');
var request = require('supertest');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var supertest = request(app);

describe('Venue API', function(){

  beforeEach(function(done) {
    mongoose.connection.collections.venues.remove(done);
  });

  function hasProperties(obj, exp) {
    expect(obj._id).to.exist;
    expect(obj.name).to.equal(exp.name);
    expect(obj.location).to.equal(exp.location);
    expect(obj.capacity).to.equal(exp.capacity);
  }

  describe('test post', function(){
    var venue = {
      name: "Maracana",
      location: "Rio de Janeiro",  
      capacity: 99000
    };

    it('should respond with 201 for valid data', function(done){
      supertest
        .post('/venue')
        .send(venue)
        .expect('Content-Type', /json/)
        .expect(function(res) { hasProperties(res.body.data, venue); })
        .expect(201, done);
    });

    it('should respond with 400 for invalid data', function(done) {
      var badVenue = {};

      supertest
        .post('/venue')
        .send(badVenue)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test get', function() {
    var id;
    var venues = [
      { name: "Maracana",
	location: "Rio de Janeiro",
	capacity: 99000 },
      { name: "Camp Nou",
	location: "Barcelona",
	capacity: 98000 }
    ];
    
    beforeEach(function(done) {
      mongoose.connection.collections.venues.insert(venues, function(err, results) {
	id = results[0]._id;
	done();
      });
    });

    it('should respond with 200 for get all', function(done){
      supertest
        .get('/venue')
        .expect('Content-Type', /json/)
        .expect(function(res) { hasProperties(res.body.data[0], venues[0]); })
        .expect(200, done);
    });

    it('should respond with 200 for valid id', function(done) {
      supertest
        .get('/venue/' + id)
        .expect('Content-Type', /json/)
        .expect(function(res) { hasProperties(res.body.data, venues[0]); })
        .expect(200, done);
    });

    it('should respond with 404 for missing resource', function(done){
      supertest
        .get('/venue/123456789012345678901234')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      supertest
        .get('/venue/434u')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test put', function() {
    var id;
    var venue = {
      name: "Maracana",
      location: "Rio de Janeiro",  
      capacity: 99000
    };
    var otherVenue = {
      name: 'Santiago Bernabeu',
      location: 'Madrid',
      capacity: 89000
    };

    beforeEach(function(done) {
      mongoose.connection.collections.venues.insert(venue, function(err, results) {
	id = results[0]._id;
	done();
      });
    });

    it('should respond with 204 for valid id and data', function(done){
      supertest
        .put('/venue/' + id)
        .send(otherVenue)
        .expect('Content-Type', /json/)
        .expect(204)
        .end(function(err, res) {
	  supertest
            .get('/venue/' + id)
            .expect(function(res) { hasProperties(res.body.data, otherVenue); })
            .end(done);
	});
    });

    it('should respond with 404 for missing resource', function(done){
      supertest
        .put('/venue/123456789012345678901234')
        .send(otherVenue)
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with 400 for invalid id', function(done){
      supertest
        .put('/venue/434u')
        .send(otherVenue)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should respond with 400 for invalid data', function(done){
      supertest
        .put('/venue/' + id)
        .send({ name: 'Mestalla' })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('test del', function(){
    var id;
    var venue = {
      name: "Maracana",
      location: "Rio de Janeiro",  
      capacity: 99000
    };

    beforeEach(function(done) {
      mongoose.connection.collections.venues.insert(venue, function(err, results) {
	id = results[0]._id;
	done();
      });
    });
    
    it('should respond with 204 for valid id', function(done){
       supertest
        .del('/venue/' + id)
        .expect(204)
        .end(function(err, res) {
	  if (err) throw err; // Checking for ECONNRESET error
	  supertest
            .get('/venue/' + id)
            .expect('Content-Type', /json/)
            .expect(404, done);
	});
    });

    it('should respond with 404 for missing resource', function(done){
      supertest
        .del('/venue/123456789012345678901234')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    xit('should respond with 400 for invalid id', function(done){ // Could not tested, ECONNRESET error raised
      supertest
        .del('/venue/434u')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});
