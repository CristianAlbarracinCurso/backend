import { Router } from "express";
import {
  showProducts,
  showOneProduct,
  paginate,
} from "../../controllers/products.controllers.js";
import productsMongoManager from "../../data/mongo/managers/product.mongo.js";

const productsViewRouter = Router();

productsViewRouter.get("/admin", async (req, res) => {
  try {
    const products = await productsMongoManager.readAll();
    res.render("productsAdmin", { data: products, isAdminPage: true });
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los productos" });
  }
});

productsViewRouter.get("/", showProducts);
productsViewRouter.get("/paginate", paginate);
productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;
