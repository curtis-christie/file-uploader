// bcrypt, db
// SALT_ROUNDS = 10
// handleSignup(req, res)
//  try catch
//  get values out of req.body
//  passwordHash
//  db.createUser
//  redirect to login
//  res.status(500).send("signup failed");

import bcrypt from "bcryptjs";

export function indexController({ usersService }) {
  return {
    create: async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const user = await usersService({ email, password });
        res.status(201).json({ data: user });
      } catch (err) {
        next(err);
      }
    },
  };
}
