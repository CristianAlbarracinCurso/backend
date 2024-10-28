import Products from "../models/products.model.js";

class ProductsMongoManager {
  constructor() {}

  async create(data) {
    try {
      const product = await Products.create(data);

      return product;
    } catch (error) {
      throw error;
    }
  }

  async readAll(category) {
    try {
      const query = category ? { category } : {};
      const products = await Products.find(query);

      return products.map((product) => ({
        ...product.toObject(),
        _id: product._id.toString(),
      }));
    } catch (error) {
      throw error;
    }
  }

  async read(pid) {
    try {
      const product = await Products.findById(pid);
      if (product) {
        return {
          ...product.toObject(),
          _id: product._id.toString(),
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async update(pid, newData) {
    try {
      const options = { new: true };
      const updated = await Products.findByIdAndUpdate(pid, newData, options);

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async destroy(pid) {
    try {
      const result = await Products.findByIdAndDelete(pid);
      if (!result) {
        throw new Error("Product not found");
      }

      return result;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  paginate = async (category, paginate) => {
    try {
      paginate.lean = true;
      const products = await Products.paginate(category, paginate);
      return products;
    } catch (error) {
      throw error;
    }
  };
}

const productsMongoManager = new ProductsMongoManager(Products);
export default productsMongoManager;
