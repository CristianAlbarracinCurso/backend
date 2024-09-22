import { Router } from "express";
import productsApiRouter from "./products.api.js";
import usersApiRouter from "./users.api.js";
import cartsApiRouter from "./carts.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsApiRouter);
apiRouter.use("/carts", cartsApiRouter);
apiRouter.use("/users", usersApiRouter);

export default apiRouter;
