function isValidProduct(req, res, next) {
  try {
    const { title, code, price, stock, category, thumbnails, statusProduct } =
      req.body;

    if (!title || !code || !price || !stock || !category) {
      const error = new Error(
        "Title, code, price, stock and category are required"
      );
      error.statusCode = 400;
      throw error;
    }

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
    return next(error);
  }
}

function isValidUser(req, res, next) {
  try {
    const { usermane, password } = req.body;
    if (!usermane || !password) {
      const error = new Error("Usuario y contraseña son requeridos");
      error.statusCode = 400;
      throw error;
    }
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
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      }

      req.session.isAuthenticated = true;
      req.session.user = user;
      return next();
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

function authMiddleware(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

export { isValidProduct, isValidUser, isValidUserRegister, authMiddleware };
