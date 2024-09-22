import express from "express";
import router from "./src/routers/index.router.js";

import __dirname from "./utils.js";
import morgan from "morgan";
import cors from "cors";
try {
  const server = express();
  const port = 8080;
  const ready = () => console.log(`server is running on port ${port}`);
  server.listen(port, ready);

  server.use(morgan("dev"));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());
  server.use("/public", express.static("public"));

  server.use(router);
} catch (error) {
  console.log(error);
}
