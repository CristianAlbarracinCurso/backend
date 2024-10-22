import { Router } from "express";
import {
  readAll,
  getOneUser,
  createUser,
  updateUser,
  destroyUser,
  loginUser,
} from "../../controllers/users.controllers.js";

const usersRouter = Router();
usersRouter.get("/", readAll);
usersRouter.get("/:uid", getOneUser);
usersRouter.post("/", createUser);
usersRouter.put("/:uid", updateUser);
usersRouter.delete("/:uid", destroyUser);
usersRouter.post("/login", loginUser);
export default usersRouter;
