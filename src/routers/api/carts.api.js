import { Router } from "express";
import {
  createCarts,
  getCartProducts,
  addCartProducts,
} from "../../controllers/carts.controllers.js";

const cartsApiRouter = Router();

cartsApiRouter.post("/", createCarts);
cartsApiRouter.get("/:cid", getCartProducts);
cartsApiRouter.post("/:cid/:pid/:quantity", addCartProducts);

export default cartsApiRouter;
