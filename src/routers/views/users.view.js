import { Router } from "express";
import {
  getOneUser,
  loginUser,
  showProfile,
} from "../../controllers/users.controllers.js";
import usersMongoManager from "../../data/mongo/managers/user.mongo.js";

const usersViewRouter = Router();

usersViewRouter.post("/login", loginUser);

usersViewRouter.get("/login", (req, res) => {
  res.render("login", { isLoginPage: true });
});

usersViewRouter.get("/online", async (req, res) => {
  try {
    const users = await usersMongoManager.getAllUsers();
    res.render("usersOnline", {
      data: users,
      isAuthenticated: req.session.isAuthenticated,
      isAdminUserPage: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los usuarios" });
  }
});

usersViewRouter.get("/", (req, res, next) => {
  try {
    return res.render("users");
  } catch (error) {
    return next(error);
  }
});

usersViewRouter.get("/:uid", getOneUser);

usersViewRouter.get("/profile/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersMongoManager.getUserById(uid);
    return res.render("profile", { data: user, isModifyUserPage: true });
  } catch (error) {
    return next(error);
  }
});

export default usersViewRouter;
