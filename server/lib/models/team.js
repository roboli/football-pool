var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: Number, default: 0 }
});

module.exports = mongoose.model('Team', TeamSchema);
