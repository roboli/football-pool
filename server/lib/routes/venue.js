var Venue = require('../models/venue');
var HttpStatus = require('http-status');

exports.all = function(req, res) {
  Venue.find(function(err, results) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    res.json(HttpStatus.OK, results);
  });
};

exports.get = function(req, res) {
  Venue.findById(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      res.json(HttpStatus.OK, result);
    }
  });
};

exports.post = function(req, res) {
  var venue = new Venue(req.body);

  venue.save(function(err) {
    if (err) {
      if (err.name == 'ValidationError') {
	return res.json(HttpStatus.BAD_REQUEST, err);
      } else {
	return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
      }
    }
    
    res.json(HttpStatus.CREATED, venue);    
  });
};

exports.put = function(req, res) {
  Venue.findById(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      result.name = req.body.name;
      result.location = req.body.location;
      result.capacity = req.body.capacity;

      result.save(function(err) {
	if (err) {
	  if (err.name == 'ValidationError') {
	    return res.json(HttpStatus.BAD_REQUEST, err);
	  } else {
	    return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
	  }
	}

	res.json(HttpStatus.NO_CONTENT, HttpStatus[204]);
      });
    }
  });
};

exports.del = function(req, res) {
  Venue.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      res.json(HttpStatus.NO_CONTENT, HttpStatus[204]);
    }
  });
};
