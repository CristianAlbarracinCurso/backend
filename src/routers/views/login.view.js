import { Router } from "express";
import fs from "fs";
import path from "path";
import { socketServer } from "../../../server.js";
import __dirname from "../../../utils.js";

const loginViewsRouter = Router();

loginViewsRouter.post("/", (req, res) => {
  const { username, password } = req.body;

  const usersPath = path.join(__dirname, "./src/data/files/users.json");

  fs.readFile(usersPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading user data");
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u.username === username);

    if (user && user.password === password) {
      req.session.isAuthenticated = true;
      req.session.user = user;
      socketServer.emit("user logged in", { username: user.name });

      return res.json({ success: true });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos." });
    }
  });
});

loginViewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    return next(error);
  }
});

export default loginViewsRouter;
