const Order = require("../models/order.model");

const orderController = {
  // SAVING CONFIRM ORDER
  async confirmOrder(req, res, next) {
    const { products, buyer } = req.body;

    let newOrder;
    try {
      newOrder = await new Order({
        products,
        buyer,
      }).save();
    } catch (error) {
      return next(error);
    }
    return res.status(201).json({ newOrder });
  },

  // GET CONFIRM ORDER
  async getConfirmOrder(req, res, next) {
    let allCofirmOrders;
    try {
      allCofirmOrders = await Order.find({}).populate("products");
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ allCofirmOrders });
  },
};

module.exports = orderController;
