const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    review: { type: String, required: true },
    product: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema, "reviews");
