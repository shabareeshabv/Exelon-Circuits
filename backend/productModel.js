const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  rating: String,
});

module.exports = mongoose.model('Product', productSchema);
