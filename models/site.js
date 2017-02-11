var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var SiteSchema = new Schema({
  name: String,
  location: String,
  coordinates: String,
  image: String

});

var Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
