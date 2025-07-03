import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export { registerUser };
