import { Router } from "express";

const authRoutes = Router();

// /auth routes
authRoutes.get("/signup", (req, res) => {
  res.json({ message: "server up and running" });
});

export default authRoutes;
