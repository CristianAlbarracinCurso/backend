import usersMongoManager from "../data/mongo/managers/user.mongo.js";
import { socketServer } from "../../server.js";

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const { email, password, name } = data;

    if (!email || !password || !name) {
      return res.status(400).json({
        statusCode: 400,
        message: "Todos los datos son obligatorios",
      });
    }

    const existingUser = await usersMongoManager.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        message: "El correo ya está registrado",
      });
    }

    const userId = await usersMongoManager.create(data);
    return res.status(201).json({
      message: "USER CREATED",
      statusCode: 201,
      response: userId._id,
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const { role } = req.query;
    const users = await usersMongoManager.readAll(role);
    if (users.length > 0) {
      return res
        .status(200)
        .json({ message: "USERS FOUND", statusCode: 200, response: users });
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
    const user = await usersMongoManager.read(uid);

    if (user) {
      res
        .status(200)
        .json({ message: "USER FOUND", statusCode: 200, response: user });
    } else {
      return res.status(404).render("error", { message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return next(error);
  }
}

async function readAll(req, res, next) {
  try {
    const users = await usersMongoManager.readAll();
    res.status(200).json({ statusCode: 200, users });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const response = await usersMongoManager.update(uid, newData);
    if (!response) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: "USER UPDATED",
      statusCode: 200,
      response: response._id,
      logout: true
    });
  } catch (error) {
    return next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersMongoManager.destroy(uid);
    if (!response) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: "USER DELETED",
      statusCode: 200,
      response: response._id,
    });
  } catch (error) {
    return next(error);
  }
}
async function findByEmail(email) {
  return usersMongoManager.find((user) => user.email === email);
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body; // Obtener email y password del cuerpo de la solicitud
    // Autenticar usuario por email
    const user = await usersMongoManager.findByEmail(email);
    // Verificar si el usuario existe y si la contraseña es correcta
    if (user && user.password === password) {
      // Aquí puedes implementar la lógica de comparación de contraseñas (ej. usando bcrypt)
      user.isOnline = true; // Cambiar el estado de `isOnline` a `true`
      await usersMongoManager.update(user._id, { isOnline: true }); // Actualizar el estado en la base de datos

      // Manejar la sesión del usuario
      req.session.isAuthenticated = true;
      req.session.user = user; // Guardar información del usuario en la sesión

      socketServer.emit("user logged in", { username: user.email }); // Emitir evento de usuario conectado

      return res.status(200).json({
        message: "USER LOGGED IN", // Mensaje de éxito
        statusCode: 200,
        response: user._id, // ID del usuario
      });
    } else {
      return res.status(401).json({
        // Código de estado 401 para credenciales incorrectas
        message: "Usuario o contraseña incorrectos.",
        statusCode: 401,
        success: false,
      });
    }
  } catch (error) {
    return next(error); // Manejar cualquier error que ocurra
  }
}

async function showProfile(req, res, next) {
  const { uid } = req.params;
  try {
    const user = await usersMongoManager.read(uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.render("profile", { user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil del usuario" });
  }
}

export {
  getAllUsers,
  getOneUser,
  readAll,
  createUser,
  updateUser,
  destroyUser,
  findByEmail,
  loginUser,
  showProfile,
};
