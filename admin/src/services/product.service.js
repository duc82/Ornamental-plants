import API from "@/api/axios.config";

class ProductService {
  async getProducts(page) {
    return API.get(`/products?page=${page}`);
  }

  async createProduct(data) {
    return API.post("/products", data);
  }

  async updateProduct(id, data) {
    return API.put(`/products/${id}`, data);
  }

  async deleteProduct(id) {
    return API.delete(`/products/${id}`);
  }
}

export default new ProductService();
