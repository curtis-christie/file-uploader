import express from "express";
import passport from "passport";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import sessionMiddleware from "./src/middleware/session.middleware.js";
import { authRouter, indexRouter } from "./src/routes/index.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

//TODO configurePassport() from config/passport.js

//TODO app.use(passport.session())

//TODO set up signup/login routes plus views
app.use("/", indexRouter);
app.use("/auth", authRouter);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on http://localhost:3000");
});
