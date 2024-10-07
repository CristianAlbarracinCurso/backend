import { Router } from "express";
import { socketServer } from "../../../server.js";
import __dirname from "../../../utils.js";
import { createUser } from "../../controllers/users.controllers.js"; // Cambiado a import
import { isValidUserRegister } from "../../middlewares/validateHandler.js"; // Cambiado a import

const registerViewsRouter = Router();

// Ruta para manejar el registro de usuarios
registerViewsRouter.post("/", isValidUserRegister, createUser);

// Ruta para renderizar el formulario de registro
registerViewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    return next(error);
  }
});

export default registerViewsRouter;
