var config = require('../configuration');
var HttpStatus = require('http-status');

exports.get = function(req, res) {
  res.json(HttpStatus.OK, { data: config.get('application:tournament') });
};
