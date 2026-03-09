import express from "express";
import session from "express-session";
import passport from "passport";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "./lib/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { configurePassport } from "./config/passport.js";
import multer from "multer";
import storage from "./config/fileStorage.js";
import usersRouter from "./routes/users.routes.js";
import "dotenv/config";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.set("view engine", "ejs");
app.set("views", path.join((__dirname, "src/views")));

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/
app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 10 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" },
  }),
);
configurePassport(prisma);
app.use(passport.session());

const upload = multer({ storage });

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
//TODO - create sign-up route to create user, create login route to login to upload page

//TODO - make sure email does not exist in the DB, add user to DB, redirect to login page
app.use("/", usersRouter);

// Health check route
// app.get("/", (req, res) => {
//   res.json({ message: "API is running" });
// });

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
