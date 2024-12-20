import API from "@/api/axios.config";

class OrderService {
  createOrder = async (data) => {
    return API.post("/orders", data);
  };

  getAllOrders = async (page) => {
    return API.get(`/orders?page=${page}`);
  };
}

export default new OrderService();
