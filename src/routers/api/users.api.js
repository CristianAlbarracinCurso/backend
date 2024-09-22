import { Router } from "express";
import { readAll, createUser } from "../../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/", readAll);

//productsRouter.get("/:pid", getProduct);

usersRouter.post("/", createUser);

//productsRouter.put("/:pid", updateProduct);
//productsRouter.delete("/:pid", destroyProduct);

export default usersRouter;
