import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);

router.get("/", (req, res) => {
  res.render("index");
});
 
export default router;
