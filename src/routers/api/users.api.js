import { Router } from "express";
import {
  readAll,
  getOneUser,
  createUser,
  updateUser,
  destroyUser,
  loginUser,
  
} from "../../controllers/users.controllers.js";

const usersApiRouter = Router();
usersApiRouter.get("/", readAll);
usersApiRouter.get("/:uid", getOneUser);
usersApiRouter.put("/:uid", updateUser);
usersApiRouter.delete("/:uid", destroyUser);
usersApiRouter.post("/login", loginUser);

export default usersApiRouter;
