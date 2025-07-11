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
import { expenseRouter } from "./src/routes/expense.route.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expense", expenseRouter)

export { app };
