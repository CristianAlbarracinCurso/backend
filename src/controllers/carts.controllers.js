import cartsManager from "../data/managers/carts.fs.js";

async function createCarts(req, res, next) {
  try {
    const { products } = req.body;
    const cartId = crypto.randomBytes(12).toString("hex");
    const newCart = {
      id: cartId,
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

    return res.status(200).json({ message: "CART PRODUCTS", products: cart.products });
  } catch (error) {
    return next(error);
  }
}

// Nueva función para agregar productos al carrito con una cantidad personalizada
async function addCartProducts(req, res, next) {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body; // Recibe la cantidad del cuerpo de la solicitud

    // Verificar si el carrito existe
    const cart = await cartsManager.read(cid);
    if (!cart) {
      const error = new Error(`Cart with ID ${cid} not found`);
      error.statusCode = 404;
      throw error;
    }

    // Verificar si el producto existe
    const product = await productsManager.read(pid);
    if (!product) {
      const error = new Error(`Product with ID ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }

    // Definir la cantidad, si no se proporciona, será 1
    const productQuantity = quantity || 1;

    // Buscar si el producto ya está en el carrito
    const productIndex = cart.products.findIndex((item) => item.product === pid);

    if (productIndex !== -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad con la proporcionada
      cart.products[productIndex].quantity += productQuantity;
    } else {
      // Si no está, agregar el nuevo producto con la cantidad proporcionada
      cart.products.push({
        product: pid, // Solo almacenamos el ID del producto
        quantity: productQuantity,
      });
    }

    // Guardar los cambios en el carrito
    const updatedCart = await cartsManager.update(cid, cart);

    return res.status(200).json({ message: "Product added to cart", cart: updatedCart });
  } catch (error) {
    return next(error);
  }
}

export {
  createCarts,
  getCartProducts,
  addCartProducts,
};
