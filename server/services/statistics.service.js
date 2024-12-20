const pool = require("../config/index");

class Statistics {
  async getStatistics() {
    const { rows: userStatistics } = await pool.query(
      "SELECT COUNT(*) FROM users"
    );
    const { rows: productStatistics } = await pool.query(
      "SELECT COUNT(*) FROM products"
    );
    const { rows: orderStatistics } = await pool.query(
      "SELECT COUNT(*) as total_orders, SUM(amount) as total_revenue FROM orders"
    );

    const statistics = {
      users: +userStatistics[0].count,
      products: +productStatistics[0].count,
      orders: +orderStatistics[0].total_orders,
      revenue: orderStatistics[0].total_revenue,
    };

    return statistics;
  }
}

module.exports = new Statistics();
