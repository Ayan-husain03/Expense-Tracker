import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addExpense, getExpense } from "../controllers/expense.controller.js";

const expenseRouter = Router();

expenseRouter.route("/").post(protect, addExpense).get(protect, getExpense);

export { expenseRouter };
