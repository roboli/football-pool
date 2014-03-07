var mongoose = require('mongoose');
var Venue = require('./venue');
var Team = require('./team');

var MatchSchema = new mongoose.Schema({
  _venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  _home_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  _visitor_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Match', MatchSchema);
