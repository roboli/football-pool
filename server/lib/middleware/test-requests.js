var testRequests = require('test-requests');
var mongoose = require('mongoose');
var async = require('async');

module.exports = testRequests;

testRequests.registerHandlers({
  clean_db: function(req, res, done) {
    var collections = mongoose.connection.collections;

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
    	cb();
      }
    ], done);
  },

  load_admin_fixture: function(req, res, done) {
    var venues = [
      { name: "Maracana",
	location: "Rio de Janeiro",
	capacity: 99000 },
      { name: "Camp Nou",
	location: "Barcelona",
	capacity: 98000 }
    ];
    
    mongoose.connection.collections.venues.insert(venues, done);
  }
});
