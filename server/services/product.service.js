const {
  getAllProductsDb,
  createProductDb,
  getProductDb,
  updateProductDb,
  deleteProductDb,
  getProductByNameDb,
  getProductBySlugDb,
} = require("../db/product.db");
const { ErrorHandler } = require("../helpers/error");

class ProductService {
  getAllProducts = async (page) => {
    const limit = 12;
    const offset = (page - 1) * limit;
    return getAllProductsDb({ limit, offset });
  };

  addProduct = async (data) => {
    return createProductDb(data);
  };

  getProductById = async (id) => {
    const product = await getProductDb(id);
    if (!product) {
      throw new ErrorHandler(404, "product not found");
    }
    return product;
  };

  getProductBySlug = async (slug) => {
    const product = await getProductBySlugDb(slug);
    if (!product) {
      throw new ErrorHandler(404, "product not found");
    }
    return product;
  };

  getProductByName = async (name) => {
    const product = await getProductByNameDb(name);
    if (!product) {
      throw new ErrorHandler(404, "product not found");
    }
  };

  updateProduct = async (data) => {
    const product = await getProductDb(data.id);
    if (!product) {
      throw new ErrorHandler(404, "product not found");
    }

    return updateProductDb(data);
  };

  removeProduct = async (id) => {
    const product = await getProductDb(id);
    if (!product) {
      throw new ErrorHandler(404, "product not found");
    }
    return deleteProductDb(id);
  };
}

module.exports = new ProductService();
