import { Router } from "express";
import {
  createCarts,
  getCartProducts,
  addCartProducts,
} from "../../controllers/carts.controllers.js";

const cartsApiRouter = Router();

cartsApiRouter.post("/", createCarts);
cartsApiRouter.get("/:cid", getCartProducts);
cartsApiRouter.post("/:cid/product/:pid", addCartProducts);

export default cartsApiRouter;
