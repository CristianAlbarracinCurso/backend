import usersManager from "../data/managers/users.fs.js";
async function getAllUsers(req, res, next) {
  try {
    const { role } = req.query;
    const users = await usersManager.readAll(role);
    if (users.length > 0) {
      return res.status(200).json({ statusCode: 200, users });
    } else {
      const error = new Error("users not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getOneUser(req, res, next) {
  try {
    const { uid } = req.params;
    const user = await usersManager.read(uid);

    if (user) {
      return res.render("profile", { user }); 
    } else {
      return res.status(404).render("error", { message: "User not found" }); 
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const { email, password, username } = data;

    // Verificar que el email y password sean obligatorios
    if (!email || !password) {
      return res.status(400).json({
        statusCode: 400,
        message: "El email y la contraseña son obligatorios",
      });
    }

    const existingUser = await usersManager.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        message: "El correo ya está registrado",
      });
    }
    const userData = {
      ...data,
      role: data.role || 0, 
      photo: data.photo || "public/imgUser/userNone.jpg", 
      isOnline: false,
    };

    const userId = await usersManager.create(userData);
    return res.status(201).json({
      statusCode: 201,
      response: userId,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    return next(error);
  }
}

async function readAll(req, res, next) {
  try {
    const users = await usersManager.readAll();
    res.status(200).json({ statusCode: 200, users });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const response = await usersManager.update(uid, newData);
    if (!response) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ statusCode: 200, response: response });
  } catch (error) {
    return next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.delete(uid);
    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ statusCode: 200, response: responseManager });
  } catch (error) {
    return next(error);
  }
}
async function findByEmail(email) {
  return users.find((user) => user.email === email);
}

export {
  getAllUsers,
  getOneUser,
  readAll,
  createUser,
  updateUser,
  destroyUser,
  findByEmail,
};
