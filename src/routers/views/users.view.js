import { Router } from "express";
import { getOneUser } from "../../controllers/users.controllers.js";

const usersViewRouter = Router();
usersViewRouter.get("/", (req, res, next) => {
  try {
    return res.render("users");
  } catch (error) {
    return next(error);
  }
});

usersViewRouter.get("/:uid", getOneUser);

export default usersViewRouter;
