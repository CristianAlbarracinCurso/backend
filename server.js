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

// middleware global para manejar el estado de sesión
server.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  res.locals.role = req.session.user?.role || "guest";
  res.locals.username = req.session.user?.name || "";
  next();
});

// Rutas
server.use("/login", loginViewsRouter); // Asegúrate de que este sea correcto
server.use(router); // Usa el router principal aquí

// routers
server.use(errorHandler);
server.use(pathHandler);
