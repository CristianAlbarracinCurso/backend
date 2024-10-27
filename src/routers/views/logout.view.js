import { Router } from "express";
import usersMongoManager from "../../data/mongo/managers/user.mongo.js"; 
const logoutViewsRouter = Router();

logoutViewsRouter.get("/", async (req, res) => {
  try {
    // Verificar si hay un usuario en la sesión
    if (req.session.user) {
      const userId = req.session.user._id; // Obtener el ID del usuario de la sesión

      // Actualizar el estado isOnline a false en la base de datos
      await usersMongoManager.update(userId, { isOnline: false });
    }

    // Destruir la sesión
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error al cerrar sesión" });
      }
      res.redirect("/"); // Redirigir a la página de inicio
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error al cerrar sesión" });
  }
});

export default logoutViewsRouter;
