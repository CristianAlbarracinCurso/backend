import { Router } from "express";
import { getOneUser,loginUser } from "../../controllers/users.controllers.js";
import usersManager from "../../data/managers/users.fs.js";

const usersViewRouter = Router();

usersViewRouter.post("/login", loginUser);


usersViewRouter.get("/login", (req, res) => {
  res.render("login");
});

usersViewRouter.get("/online", async (req, res) => {
  try {
    const users = await usersManager.readAll(); // Obtener todos los usuarios
    res.render("usersOnline", {
      data: users,
      isAuthenticated: req.session.isAuthenticated // Pasar el estado de autenticación a la vista
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

export default usersViewRouter;
