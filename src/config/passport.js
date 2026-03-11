import passport from "passport";
import { LocalStrategy } from "passport-local";

export function configurePassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: "false",
      },
      async (email, password, done) => {
        try {
        } catch (err) {}
      },
    ),
  );
}
