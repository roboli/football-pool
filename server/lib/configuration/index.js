var nconf = require('nconf');

module.exports = new Config();

function Config(){
  nconf.argv().env('_');
  var environment = nconf.get('NODE:ENV') || 'development';
  nconf.file(environment, 'config/' + environment + '.json');
  nconf.file('default', 'config/default.json');
}

Config.prototype.get = function(key) {
  return nconf.get(key);
};
