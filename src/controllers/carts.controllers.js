import cartsMongoManager from "../data/mongo/managers/cart.mongo.js";
import productsMongoManager from "../data/mongo/managers/product.mongo.js";

async function createCarts(req, res, next) {
  try {
    const data = req.body;
    const response = await cartsMongoManager.create(data);
    return res.status(201).json({
      message: "CART CREATED",
      statusCode: 201,
      response: response._id,
    });
  } catch (error) {
    return next(error);
  }
}

const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const response = await cartsMongoManager.readAll(filter);
    if (response.length > 0) {
      return res
        .status(200)
        .json({ message: "CARTS READ", statusCode: 200, response: response });
    } else {
      const error = new Error("NOT FOUND CARTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

async function getCartProducts(req, res, next) {
  try {
    const { cid } = req.params;
    const cart = await cartsMongoManager.read(cid);
    if (!cart) {
      const error = new Error(`Cart with ID ${cid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(201).json({
      message: "CARTS PRODUCTS",
      statusCode: 201,
      response: cart,
    });
  } catch (error) {
    return next(error);
  }
}



async function updateCart(req, res, next) {
  try {
    const { cid } = req.params;
    const newData = req.body;
    const response = await cartsMongoManager.update(cid, newData);
    if (!response) {
      const error = new Error(`Cart with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: "CART UPDATED",
      statusCode: 200,
      response: response._id,
      logout: true,
    });
  } catch (error) {
    return next(error);
  }
}

const destroyCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const response = await cartsMongoManager.destroy(cid);
    return res.status(200).json({
      message: "CARTS DELETED",
      statusCode: 201,
      response: response._id,
    });
  } catch (error) {
    return next(error);
  }
};



async function addCartProducts(req, res, next) {
  try {
    const { cid, pid, quantity } = req.params;
    const product = await productsMongoManager.read(pid);
    if (!product) {
      const error = new Error(`Product with ID ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    const cart = await cartsMongoManager.read(cid);
    if (!cart) {
      const error = new Error(`Cart with ID ${cid} not found`);
      error.statusCode = 404;
      throw error;
    }
    cart.products = cart.products || [];
    const productIndex = cart.products.findIndex(
      (item) => item.product_id && item.product_id.toString() === pid
    );
    //si el producto ya estaba en el carrito agrego las nuevas unidades
    if (productIndex !== -1) {
      cart.products[productIndex].quantity =
        parseInt(cart.products[productIndex].quantity, 10) +
        parseInt(quantity, 10);
    } else {
      // Si el producto no esta en el carrito
      cart.products.push({
        product_id: pid,
        quantity: parseInt(quantity, 10),
      });
    }
    const updatedCart = await cartsMongoManager.update(cid, cart);
    return res.status(201).json({
      message: "PRODUCT ADDED TO CART",
      statusCode: 201,
      response: updatedCart._id,
    });
  } catch (error) {
    return next(error);
  }
}

const calculatePrice = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const response = await cartsMongoManager.calculatePrice(cid);
    return res.status(200).json({
      message: "PRICE CALCULATED",
      statusCode: 201,
      response: response,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  createCarts,
  calculatePrice,
  getCartProducts,
  addCartProducts,
  readAll,
  destroyCart,
  updateCart,
};
