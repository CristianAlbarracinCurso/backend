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

// handlebars
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
server.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false, // No guardar sesiones vacías
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // Duración de la cookie: 1 hora
    },
  })
);
// Middleware global para pasar la sesión del usuario a todas las vistas
server.use((req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    res.locals.isAuthenticated = true;
    res.locals.role = req.session.user.role;
  } else {
    res.locals.user = null;
    res.locals.isAuthenticated = false;
    res.locals.role = "guest";
  }
  next();
});

// Rutas
server.use(router);

// routers
server.use(errorHandler);
server.use(pathHandler);
