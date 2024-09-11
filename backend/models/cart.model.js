const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product",
    },
    UserId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartSchema, "cartItems");
