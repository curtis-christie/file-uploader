import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
import { signupValidator } from "../middleware/validation/signup.validator.js";
import { handleValidationErrors } from "../middleware/validation/handleValidationErrors.js";

const authRoutes = Router();

// /auth/signup route
authRoutes.get("/signup", (req, res) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", signupValidator, handleValidationErrors, signUp);

authRoutes.get("/login", (req, res) => {
  res.render("auth/login");
});

authRoutes.post("/login", login);

authRoutes.get("/logout", logout);

export default authRoutes;
