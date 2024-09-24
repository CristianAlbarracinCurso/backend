function isValidProduct(req, res, next) {
  try {
    const { title, code, price, stock, category, thumbnails, statusProduct } =
      req.body;

    // Verificar si los campos obligatorios están presentes
    if (!title || !code || !price || !stock || !category) {
      const error = new Error(
        "Title, code, price, stock and category are required"
      );
      error.statusCode = 400;
      throw error;
    }

    // Asignar valores por defecto si thumbnails o statusProduct no están definidos
    req.body.thumbnails = thumbnails || "none";
    req.body.statusProduct = statusProduct !== undefined ? statusProduct : true;

    return next();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

function isValidUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("email and password are required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export { isValidProduct, isValidUser };
