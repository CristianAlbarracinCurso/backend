import productsManager from "../data/managers/products.fs.js";

async function getAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }
    if (response.length > 0) {
      return res.status(200).json({ statusCode: 200, response });
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
    const response = await productsManager.read(pid);

    if (response) {
      return res.status(200).json({ statusCode: 200, response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

//Falta verificar si un title ya existe para no crear dos veces el mismo producto
async function createProduct(req, res, next) {
  try {
    const product = req.body;
    const response = await productsManager.create(product);
    return res.status(201).json({ statusCode: 201, response });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const response = await productsManager.update(pid, newData);
    if (!response) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ statusCode: 200, response: response });
  } catch (error) {
    return next(error);
  }
}

async function destroyProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.delete(pid);
    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ statusCode: 200, response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function showProducts(req, res, next) {
  try {
    let { category } = req.query;
    let all;
    if (!category) {
      all = await productsManager.readAll();
    } else {
      all = await productsManager.readAll(category);
    }
    if (all.length > 0) {
      return res.render("products", { data: all });
      // render habilita de forma opcional un segundo parametro
      // para enviar datos a la plantilla de handlebars
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
  // res es el objeto de respuesta a enviar al cliente
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);
    // response es la respuesta que se espera del manager (para leer un producto)
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

export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  destroyProduct,
  showProducts,
  showOneProduct,
};
