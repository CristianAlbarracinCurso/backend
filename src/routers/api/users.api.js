import { Router } from "express";
import {
  readAll,
  getOneUser,
  createUser,
  updateUser,
  destroyUser,
} from "../../controllers/users.controllers.js";

const usersRouter = Router();
//Faltan las rutas de los usuarios
usersRouter.get("/", readAll);
usersRouter.get("/:uid", getOneUser);
usersRouter.post("/", createUser);
usersRouter.put("/:uid", updateUser);
usersRouter.delete("/:uid", destroyUser);

export default usersRouter;
