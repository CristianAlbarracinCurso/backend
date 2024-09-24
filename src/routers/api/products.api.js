import { Router } from "express";
import { isValidProduct } from "../../middlewares/validateHandler.js";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  destroyProduct,
} from "../../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:pid", getOneProduct);
productsRouter.post("/", isValidProduct, createProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", destroyProduct);

export default productsRouter;
