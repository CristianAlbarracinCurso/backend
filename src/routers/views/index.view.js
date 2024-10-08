import { Router } from "express";

import productsViewRouter from "./products.view.js";
import cartsViewRouter from "./carts.view.js";
import usersViewRouter from "./users.view.js";
import chatsViewRouter from "./chats.view.js";

import logoutViewRouter from "./logout.view.js";
import registerViewRouter from "./register.view.js";

const viewRouter = Router();

viewRouter.use("/products", productsViewRouter);
viewRouter.use("/carts", cartsViewRouter);
viewRouter.use("/users", usersViewRouter);
viewRouter.use("/chats", chatsViewRouter);
viewRouter.use("/register", registerViewRouter);
viewRouter.use("/logout", logoutViewRouter);

viewRouter.get("/", (req, res, next) => {
  try {
    return res.render("index");
  } catch (error) {
    return next(error);
  }
});
export default viewRouter;
