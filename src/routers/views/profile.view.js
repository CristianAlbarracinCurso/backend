import { Router } from "express";
import { getOneUser } from "../../controllers/users.controllers.js";

const profileViewsRouter = Router();

// Ruta para obtener el perfil de un usuario por su UID
profileViewsRouter.get("/profile/:uid", getOneUser);

export default profileViewsRouter;