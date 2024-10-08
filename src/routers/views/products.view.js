import { Router } from "express";
import {
  showProducts,
  showOneProduct,
} from "../../controllers/products.controllers.js";
import productsManager from "../../data/managers/products.fs.js";

const productsViewRouter = Router();

productsViewRouter.get("/admin", async (req, res) => {
  try {
    const products = await productsManager.readAll(); // Obtener todos los productos
    res.render("productsAdmin", { data: products }); // Pasar los productos a la vista como "data"
  } catch (error) {
    // Muestra un error en la respuesta si ocurre algún problema
    res.status(500).send({ message: "Error al obtener los productos" });
  }
});


productsViewRouter.get("/", showProducts);

productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;
