var HttpStatus = require('http-status');

exports.validate = function(req, res, next, id){
  if (id.match(/^[0-9a-fA-F]{24}$/) === null) return res.json(HttpStatus.BAD_REQUEST, HttpStatus[400]);
  next();
};
