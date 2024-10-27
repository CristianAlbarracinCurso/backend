import { Router } from "express";
import {
  createCarts,
  getCartProducts,
  //addCartProducts,
  readAll,
  calculatePrice,
  updateCart,
  destroyCart,
} from "../../controllers/carts.controllers.js";

const cartsApiRouter = Router();

cartsApiRouter.post("/", createCarts);
cartsApiRouter.get("/", readAll);
cartsApiRouter.get("/:cid", getCartProducts);
//cartsApiRouter.post("/:cid/:pid/:quantity", addCartProducts);
cartsApiRouter.put("/:cid", updateCart);
cartsApiRouter.delete("/:cid", destroyCart);
cartsApiRouter.get("/price/:cid", calculatePrice);

export default cartsApiRouter;
