import { Router } from "express";

const chatsViewsRouter = Router();

chatsViewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("chats");
  } catch (error) {
    return next(error);
  }
});
export default chatsViewsRouter;
