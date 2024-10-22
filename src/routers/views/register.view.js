import { Router } from "express";
import { socketServer } from "../../../server.js";
import __dirname from "../../../utils.js";
import { createUser } from "../../controllers/users.controllers.js";
import { isValidUserRegister } from "../../middlewares/validateHandler.js";

const registerViewsRouter = Router();

registerViewsRouter.post("/", isValidUserRegister, createUser);

registerViewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    return next(error);
  }
});

export default registerViewsRouter;
