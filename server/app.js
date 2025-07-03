import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  * importing router

import { router as authRoutes } from "./src/routes/auth.routes.js";

app.use("/api/v1/auth", authRoutes);

export { app };
