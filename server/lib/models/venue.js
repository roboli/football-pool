var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Venue', VenueSchema);
