import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

export function configurePassport(prisma) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const normalizedEmail = String(email).trim().toLowerCase();

          const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: {
              id: true,
              email: true,
              passwordHash: true,
            },
          });

          if (!user) {
            return done(null, false, { message: "Invalid Credentials" });
          }

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) {
            return done(null, false, { message: "Invalid Credentials" });
          }

          return done(null, { id: user.id, email: user.email });
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: String(id) },
        select: { id: true, email: true, createdAt: true },
      });

      if (!user) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}
