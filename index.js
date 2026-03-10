import express, { urlencoded } from "express";
import { authRouter, indexRouter } from "./src/routes/index.routes.js";

const app = express();

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
