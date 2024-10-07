import { Router } from "express";
import fs from "fs";
import path from "path";
import { socketServer } from "../../../server.js"; // Asegúrate de que esta ruta sea correcta
import __dirname from "../../../utils.js";

const loginViewsRouter = Router();

loginViewsRouter.post("/", (req, res) => {
  console.log("Body:", req.body);
  const { username, password } = req.body;
  console.log("Users1:", username);
  console.log("Pass1:", password);
  // Leer usuarios desde el archivo JSON
  const usersPath = path.join(__dirname, "./src/data/files/users.json"); // Ajusta la ruta según tu estructura

  fs.readFile(usersPath, "utf-8", (err, data) => {
    console.log("Users:", username);
    console.log("Pass:", password);

    if (err) {
      return res.status(500).send("Error reading user data");
    }

    const users = JSON.parse(data);
    const user = users.find(
      (u) => u.name === username && u.password === password
    );

    if (user) {
      // Aquí puedes guardar la sesión si es necesario
      req.session.isAuthenticated = true;
      req.session.user = user;

      // Emitir un evento a través del socket
      socketServer.emit("user logged in", { username: user.name });

      return res.redirect("./products"); // Redirigir al usuario a la página principal
    } else {
      return res.status(401).send("Invalid username or password");
    }
  });
});

// Esta ruta debería ser la que renderiza la vista del formulario de login
loginViewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    return next(error);
  }
});

export default loginViewsRouter;
