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
    req.body.thumbnails = thumbnails || "none.jpg";
    req.body.statusProduct = statusProduct !== undefined ? statusProduct : true;

    return next();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

function isValidUserRegister(req, res, next) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      const error = new Error("email, password and username are required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    return next(error); // Cambié aquí para que pase el error a next()
  }
}

function isValidUser(req, res, next) {
  try {
    const { usermane, password } = req.body;

    // Validación de campos vacíos
    if (!usermane || !password) {
      const error = new Error("Usuario y contraseña son requeridos");
      error.statusCode = 400;
      throw error;
    }

    // Aquí podrías agregar validación adicional, como longitud mínima, formato de email, etc.

    // Simular la validación de usuario (podrías hacer una búsqueda en la base de datos aquí)
    const usersPath = path.join(__dirname, "./src/data/files/users.json");

    fs.readFile(usersPath, "utf-8", (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error leyendo los datos de usuario" });
      }

      const users = JSON.parse(data);
      const user = users.find(
        (u) => u.usermane === usermane && u.password === password
      );

      if (!user) {
        // Usuario no encontrado o contraseña incorrecta
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      }

      // Si el login es válido, continuar con el siguiente middleware
      req.session.isAuthenticated = true;
      req.session.user = user;
      return next();
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export { isValidProduct, isValidUser, isValidUserRegister };
