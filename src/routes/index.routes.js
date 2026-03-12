import { Router } from "express";
import authRouter from "./auth.routes.js";
import { requireAuth } from "../middleware/requireAuth.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("home");
});

indexRouter.get("/dashboard", requireAuth, (req, res) => {
  console.log(req.user);
  res.render("dashboard");
});

export { authRouter, indexRouter };
