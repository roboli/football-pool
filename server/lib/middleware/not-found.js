var HttpStatus = require('http-status');

exports.index = function(req, res, next) {
  res.json(HttpStatus.NOT_FOUND, HttpStatus[404]);
};
