import { Router } from "express";
import usersMongoManager  from "../../data/mongo/managers/user.mongo.js";


const chatsViewsRouter = Router();

chatsViewsRouter.get("/", (req, res, next) => {
  try {
    const user = req.session.user;
    if (user) {
      res.render("chats", { user }); // Pasa el objeto `user` a la vista
    } else {
      res.redirect("/users/login"); // Redirecciona al login si no hay usuario en sesión
    }
    
  } catch (error) {
    return next(error);
  }
});
export default chatsViewsRouter;
