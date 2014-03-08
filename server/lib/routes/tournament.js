var config = require('../configuration');

exports.get = function(req, res) {
  res.json(200, config.get('application:tournament'));
};
