const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    brand: String,
    price: String,
    catergory: String,
    quantity: String
  })
);

module.exports = Product;