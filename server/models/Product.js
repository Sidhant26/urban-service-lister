const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  productName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  shortDesc: { type: String, required: true },
  description: { type: String, required: true },
  reviews: [
    {
      userName:{type:String,required:false},
      rating: { type: Number, required: true },
      text: { type: String, required: true },
    },
  ],
  avgRating: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
