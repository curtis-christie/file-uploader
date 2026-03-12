import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserByEmail, findUserById } from "../lib/queries.js";
import bcrypt from "bcryptjs";

export function configurePassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const user = await findUserByEmail(email);
          if (!user) return done(null, false, { message: "Incorrect Credentials" });

          // console.log("USER FROM DB:", user);
          // console.log("PASSWORD HASH:", user?.passwordHash);

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) return done(null, false, { message: "Incorrect Credentials" });
          return done(null, user);
        } catch (err) {
          done(err);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserById(id);
      return done(null, user || false);
    } catch (err) {
      return done(err);
    }
  });
}
