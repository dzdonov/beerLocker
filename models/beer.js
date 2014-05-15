var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({
  name: String,
  type: String,
  qty: Number
});

module.exports = mongoose.model('Beer', BeerSchema);
