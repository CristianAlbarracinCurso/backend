import { Router } from "express";
import {
  showProducts,
  showOneProduct,
} from "../../controllers/products.controllers.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showProducts);
productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;
