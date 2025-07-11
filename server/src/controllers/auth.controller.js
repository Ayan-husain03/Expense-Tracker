import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async function (req, res, next) {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password)
    throw new ApiError(400, "All fields are required");
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(401, "User already exists");
  const user = await User.create({
    fullname,
    email,
    password,
  });
  const token = user.generateToken();
  res.cookie("token", token, {
    httpOnly: true,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "User Registered Successfully", user));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new ApiError(400, "please enter email and password");
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "User doesn't exists");
  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiError(401, "password is not correct");
  const token = user.generateToken();
  const options = {
    httpOnly: true,
    secure: true,
  };
  const logUser = {
    fullname: user.fullname,
    email: user.email,
  };
  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(200, "user login successfully", { user: logUser, token })
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  res.clearCookie("token", options);
  return res.status(200).json(new ApiResponse(200, "user logout", null));
});

const getProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = {
    fullname: req.user.fullname,
    email: req.user.email,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, "successfully get user details", user));
});

export { registerUser, loginUser, logoutUser, getProfile };
