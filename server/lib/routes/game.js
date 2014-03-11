var Game = require('../models/game');
var HttpStatus = require('http-status');

exports.all = function(req, res) {
  Game.find().populate('_venue _home_team _away_team').exec(function(err, results) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    res.json(HttpStatus.OK, { data: results });
  });
};

exports.get = function(req, res) {
  Game.findById(req.params.id).populate('_venue _home_team _away_team').exec(function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      res.json(HttpStatus.OK, { data: result });
    }
  });
};

exports.post = function(req, res) {
  var game = new Game(req.body);

  game.save(function(err) {
    if (err) {
      if (err.name == 'ValidationError' || err.name == 'CastError') {
	return res.json(HttpStatus.BAD_REQUEST, err);
      } else {
	return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
      }
    }
    
    res.json(HttpStatus.CREATED, { data: game });    
  });
};

exports.put = function(req, res) {
  Game.findById(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      result._venue = req.body._venue;
      result._home_team = req.body._home_team;
      result._away_team = req.body._away_team;
      result.date = req.body.date;

      result.save(function(err) {
	if (err) {
	  if (err.name == 'ValidationError' || err.name == 'CastError') {
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
  Game.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) return res.json(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500]);
    if (!result) {
      res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
    } else {
      res.json(HttpStatus.NO_CONTENT, HttpStatus[204]);
    }
  });
};
