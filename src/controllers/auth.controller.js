import { createUser, findUser } from "../lib/queries.js";
import bcrypt from "bcryptjs";

async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;

    const existingUser = await findUser(email);

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

export { signUp };
