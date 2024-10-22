import { Router } from "express";
const cartsViewRouter = Router();

cartsViewRouter.get("/", (req, res, next) => {
  try {
    return res.render("carts");
  } catch (error) {
    return next(error);
  }
});
export default cartsViewRouter;
