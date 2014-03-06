var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number
});

module.exports = mongoose.model('Venue', VenueSchema);
