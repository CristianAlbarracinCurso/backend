import { Router } from "express";
import cartsMongoManager from "../../data/mongo/managers/cart.mongo.js";
const cartsViewRouter = Router();

cartsViewRouter.get("/", (req, res, next) => {
  try {
    return res.render("carts");
  } catch (error) {
    return next(error);
  }
});

cartsViewRouter.get("/details/:uid", async (req, res, next) => {
  const  uid  = req.params; 
  try {
    const { response: cartItems } = await cartsMongoManager.readAll(uid); 
    return res.render("cartDetails", { cartItems }); 
  } catch (error) {
    return next(error);
  }
});

export default cartsViewRouter;
