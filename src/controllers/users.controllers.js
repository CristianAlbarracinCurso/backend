import usersManager from "../data/managers/users.fs.js";
import { socketServer } from "../../server.js"
import socketCb from "../routers/index.socket.js";

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
      role: data.role || "0", 
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


async function loginUser(req, res, next) {
  try {
    const { username, password } = req.body;

    // Lógica de autenticación de usuario
    const user = await usersManager.authenticate(username, password);

    if (user) {
      // Si el usuario es autenticado
      user.isOnline = true; // Marca al usuario como en línea
      await usersManager.update(user.id, user); // Actualiza el estado del usuario

      req.session.isAuthenticated = true; // Marca la sesión como autenticada
      req.session.user = user; // Guarda el usuario en la sesión para usarlo luego

      // Emitir evento de inicio de sesión
      socketServer.emit("user logged in", { username: user.username });

      // Devolver una respuesta de éxito que el frontend pueda manejar con SweetAlert
      return res.status(200).json({ success: true, message: "Inicio de sesión exitoso" });
    } else {
      // Usuario o contraseña incorrectos
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos." });
    }
  } catch (error) {
    return next(error);
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
  loginUser
};
