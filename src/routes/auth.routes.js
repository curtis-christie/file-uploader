import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
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

export default authRoutes;
