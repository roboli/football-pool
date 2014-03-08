var Venue = require('../models/venue');

exports.all = function(req, res) {
  Venue.find(function(err, results) {
    if (err) return res.json(500, 'Internal Server Error');
    res.json(200, results);
  });
};

exports.post = function(req, res) {
  var venue = new Venue(req.body);

  venue.save(function(err) {
    if (err) {
      if (err.name == 'ValidationError') {
	return res.json(400, err);
      } else {
	return res.json(500, 'Internal Server Error');
      }
    }
    
    res.json(201, venue);    
  });
};
