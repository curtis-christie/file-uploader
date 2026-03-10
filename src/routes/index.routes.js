import { Router } from "express";
import authRouter from "./auth.routes.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json({ message: "This is the homepage" });
});

export { authRouter, indexRouter };
