import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import { authRouter, indexRouter } from "./src/routes/index.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Listening on http://localhost:3000");
});
