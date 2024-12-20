const {
  createOrderDb,
  getAllOrdersDb,
  getOrderDb,
} = require("../db/orders.db");
const { ErrorHandler } = require("../helpers/error");

class OrderService {
  createOrder = async (data) => {
    try {
      return await createOrderDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getAllOrders = async (userId, page) => {
    const limit = 5;
    const offset = (page - 1) * limit;
    return getAllOrdersDb({ userId, limit, offset });
  };

  getOrderById = async (data) => {
    const order = await getOrderDb(data);
    if (!order) {
      throw new ErrorHandler(404, "Order does not exist");
    }
    return order;
  };
}

module.exports = new OrderService();
