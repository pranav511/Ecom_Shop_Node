const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  images: { type: [String], required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'brand', required: true },
  isFeatured:{
    type:Boolean
  },
  isNeww:{
    type:Boolean
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;