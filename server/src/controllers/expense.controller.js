import { Expense } from "../models/expense.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addExpense = asyncHandler(async (req, res, next) => {
  const { amount, type, category, title, date } = req.body;
  if (!amount || !type || !category || !title || !date)
    throw new ApiError(400, "All fields are required");
  const expense = await Expense.create({
    user: req?.user?._id,
    amount,
    type,
    category,
    title,
    date,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, "Expense added successfully", expense));
});

const getExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.find({ user: req.user._id }).sort("-createdAt");
  // console.log(req.user);
  // console.log(expense);
  // console.log(req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, "Expense fetched successfully", expense));
});

export { addExpense, getExpense };
