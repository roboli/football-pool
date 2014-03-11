var Team = require('../models/team');
var HttpStatus = require('http-status');

exports.all = function(req, res) {
  Team.find(function(err, results) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    res.json(HttpStatus.OK, results);
  });
};

exports.get = function(req, res) {
  Team.findById(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      res.json(HttpStatus.OK, result);
    }
  });
};

exports.post = function(req, res) {
  var team = new Team(req.body);

  team.save(function(err) {
    if (err) {
      if (err.name == 'ValidationError') {
	return res.json(HttpStatus.BAD_REQUEST, err);
      } else {
	return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
      }
    }
    
    res.json(HttpStatus.CREATED, team);    
  });
};

exports.put = function(req, res) {
  Team.findById(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      result.name = req.body.name;
      result.rank = req.body.rank;

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
  Team.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      res.json(HttpStatus.NO_CONTENT, HttpStatus[204]);
    }
  });
};
