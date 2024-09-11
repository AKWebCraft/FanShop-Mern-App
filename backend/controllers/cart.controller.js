const CartItem = require("../models/cart.model");

const cartController = {
  /// ADD ITEM TO CART
  async addItemToCart(req, res, next) {
    const { productId, UserId, quantity } = req.body;
    let cartResponse;
    try {
      cartResponse = await new CartItem({
        productId,
        UserId,
        quantity,
      }).save();
    } catch (error) {
      return next(error);
    }

    return res.status(201).json({ cartResponse });
  },

  // GET CART ITEMS
  async getCartItems(req, res, next) {
    const { id } = req.params;

    let allCartItems;
    try {
      allCartItems = await CartItem.find({ UserId: id }).populate("productId");
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ allCartItems });
  },

  // DELETE CART ITEM
  async deleteCartItems(req, res, next) {
    const { id } = req.params;
    try {
      await CartItem.findByIdAndDelete({ _id: id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: " product deleted successfully" });
  },

  // CLEAR CART
  async clearCart(req, res, next) {
    const { _id } = req.params;
    try {
      await CartItem.deleteMany({ UserId: _id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: " Cart has been cleared" });
  },
};

module.exports = cartController;
