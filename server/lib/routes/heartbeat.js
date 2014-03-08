var HttpStatus = require('http-status');

exports.index = function(req, res) {
  res.json(HttpStatus.OK, HttpStatus[200]);
};
