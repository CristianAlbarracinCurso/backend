import productsMongoManager from "../data/mongo/managers/product.mongo.js";

//ok
async function createProduct(req, res, next) {
  try {
    const product = req.body;
    const response = await productsMongoManager.create(product);
    return res.status(201).json({
      message: "PRODUCT CREATED",
      statusCode: 201,
      response: response._id,
    });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const response = await productsMongoManager.update(pid, newData);
    if (!response) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: "PRODUCT UPDATED",
      statusCode: 200,
      response: response._id,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroyProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsMongoManager.destroy(pid);
    if (!response) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: "PRODUCT DELETED",
      statusCode: 200,
      response: response._id,
    });
  } catch (error) {
    onsole.error("Error al eliminar el producto:", error);
    return next(error);
  }
}

async function getAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsMongoManager.readAll();
    } else {
      response = await productsMongoManager.readAll(category);
    }
    if (response.length > 0) {
      return res.status(200).json({
        message: "PRODUCTS FOUND",
        statusCode: 200,
        response: response,
      });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getOneProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsMongoManager.read(pid);

    if (response) {
      return res.status(200).json({
        message: "PRODUCT FOUND",
        statusCode: 200,
        response: response,
      });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function showProducts(req, res, next) {
  try {
    const { category, page = 1, limit = 8 } = req.query;
    const query = category ? { category } : {};

    // Obtener productos paginados
    const products = await productsMongoManager.paginate(query, {
      page,
      limit,
    });

    // Comprobar si hay productos
    if (products.docs.length > 0) {
      return res.render("products", {
        data: products.docs,
        totalPages: products.totalPages,
        currentPage: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        isProductsPage: true,
        userId: req.session.user._id
      });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function showOneProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsMongoManager.read(pid);
    if (response) {
      return res.render("oneproduct", { one: response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const { page, limit } = req.query;
    const products = await productsMongoManager.paginate({}, { page, limit });
    if (products.length > 0) {
      return res.status(200).json({
        message: "PRODUCTS READ",
        statusCode: 200,
        response: products.docs,
        prev: products.prevPage,
        next: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  destroyProduct,
  showProducts,
  showOneProduct,
  paginate,
};
