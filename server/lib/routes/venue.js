var Venue = require('../models/venue');

exports.post = function(req, res) {
  var venue = new Venue(req.body);

  venue.save(function(err) {
    if (err) throw err;
    res.json(201, venue);    
  });
};
