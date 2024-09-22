import { Router } from "express";
import { readAll, createUser } from "../../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/", readAll);
//usersRouter.get("/:pid", getUser);
usersRouter.post("/", createUser);
//usersRouter.put("/:pid", updateUser);
//usersRouter.delete("/:pid", destroyUser);

export default usersRouter;
