import { Router } from "express";

const logoutViewsRouter = Router();

logoutViewsRouter.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error al cerrar sesión" });
    }
    res.redirect("/");
  });
});

export default logoutViewsRouter;
