import express from "express";
import session from "express-session";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/routers/index.socket.js";
import {
  isValidProduct,
  isValidUser,
} from "./src/middlewares/validateHandler.js";
import loginViewsRouter from "./src/routers/views/login.view.js";
import profileViewsRouter from "./src/routers/views/profile.view.js";

// server http
const server = express();
const port = 8080;
const ready = () => console.log(`server is running on port ${port}`);
const httpServer = createServer(server);
httpServer.listen(port, ready);

// server tcp chat
const socketServer = new Server(httpServer);
socketServer.on("connection", socketCb);
export { socketServer };

// template
server.engine(
  "handlebars",
  engine({
    helpers: {
      eq: (a, b) => a === b,
    },
  })
);
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// middlewares
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use("/public", express.static("public"));

// middleware de sesión
server.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Cambia a true si usas HTTPS en producción
  })
);

server.use((req, res, next) => {
  // Asegúrate de que req.session esté disponible
  if (req.session) {
    res.locals.isAuthenticated = req.session.isAuthenticated || false;
    
    // Determina el rol en función del valor de req.session.user.role
    if (req.session.user) {
      res.locals.role = req.session.user.role === 1 ? "admin" : "user"; // 1 para administradores, 0 para usuarios
      res.locals.username = req.session.user.name || ""; // Asegúrate de verificar si user existe
    } else {
      res.locals.role = "guest"; // Si no hay usuario, asigna "guest"
      res.locals.username = "";
    }
  } else {
    res.locals.isAuthenticated = false;
    res.locals.role = "guest";
    res.locals.username = "";
  }
  next();
});

// Rutas

server.use(router); 

// routers
server.use(errorHandler);
server.use(pathHandler);
