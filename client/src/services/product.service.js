import API from "api/axios.config";

class ProductService {
  getProducts(page) {
    return API.get(`/products/?page=${page}`);
  }
  getProductBySlug(slug) {
    return API.get(`/products/by-slug/${slug}`);
  }
  getProductByName(name) {
    return API.get(`/products/${name}`);
  }
}

export default new ProductService();
