import { Router } from "express";
import { isValidProduct } from "../../middlewares/validateHandler.js";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  destroyProduct,
  paginate,
} from "../../controllers/products.controllers.js";

const productsApiRouter = Router();

productsApiRouter.post("/", isValidProduct, createProduct);
productsApiRouter.get("/", getAllProducts);
productsApiRouter.get("/paginate", paginate);
productsApiRouter.get("/:pid", getOneProduct);
productsApiRouter.put("/:pid", updateProduct);
productsApiRouter.delete("/:pid", destroyProduct);

export default productsApiRouter;
