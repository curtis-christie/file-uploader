import passport from "passport";
import { createUser, findUserByEmail } from "../lib/queries.js";
import bcrypt from "bcryptjs";

async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: "A user with that email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await createUser(email, passwordHash);

    if (newUser) {
      res.redirect("login");
    } else {
      res.redirect("signup");
    }
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.redirect("login");
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.redirect("/dashboard");
    });
  })(req, res, next);
}

async function logout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/auth/login");
  });
}

export { signUp, login, logout };
