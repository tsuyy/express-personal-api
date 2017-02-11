var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var DestinationSchema = new Schema({
  name: String,
  location: String,
  coordinates: String,
  image: String

});

var Destination = mongoose.model('Destination', DestinationSchema);

module.exports = Destination;
