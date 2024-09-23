import cartsManager from "../data/managers/carts.fs.js";
import productsManager from "../data/managers/products.fs.js";

async function createCarts(req, res, next) {
  try {
    const { products } = req.body;
    const newCart = {
      products: products || [],
    };
    const response = await cartsManager.create(newCart);
    return res.status(201).json({ message: "CART CREATED", response });
  } catch (error) {
    return next(error);
  }
}

async function getCartProducts(req, res, next) {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.read(cid);

    if (!cart) {
      const error = new Error(`Cart with ID ${cid} not found`);
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({ message: "CART PRODUCTS", cart });
  } catch (error) {
    return next(error);
  }
}

async function addCartProducts(req, res, next) {
  try {
    const { cid, pid } = req.params;
    let { quantity } = req.params;

    quantity = parseInt(quantity, 10);
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }

    const cart = await cartsManager.read(cid);
    if (!cart) {
      const error = new Error(`Cart with ID ${cid} not found`);
      error.statusCode = 404;
      throw error;
    }

    const product = await productsManager.read(pid);
    if (!product) {
      const error = new Error(`Product with ID ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product === pid
    );

    if (productIndex !== -1) {
      // si el producto ya existe en el carrito, aumentar la cantidad enviada (aunque pide hacerlo de uno en uno)
      cart.products[productIndex].quantity =
        parseInt(cart.products[productIndex].quantity, 10) + quantity;
    } else {
      // Si no está en el carrito, se pone la cantidad enviada
      cart.products.push({
        product: pid,
        quantity: quantity,
      });
    }
    const updatedCart = await cartsManager.update(cid, cart);

    return res
      .status(200)
      .json({ message: "Product added to cart", cart: updatedCart });
  } catch (error) {
    return next(error);
  }
}

export { createCarts, getCartProducts, addCartProducts };
