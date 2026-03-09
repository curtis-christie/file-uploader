import { Router } from "express";
import { indexController } from "../controllers/index.controller.js";

const usersRouter = Router();

usersRouter.get("/signup", (req, res) => res.render("signup"));

export default usersRouter;
