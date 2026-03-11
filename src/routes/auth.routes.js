import { Router } from "express";

const authRoutes = Router();

// /auth/signup route
authRoutes.get("/signup", (req, res) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res) => {
  // register user logic
});

export default authRoutes;
