var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: Number
});

module.exports = mongoose.model('Venue', VenueSchema);
