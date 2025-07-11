import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
  // ? check token in cookie
  // console.log(req?.cookies?.token);
  // console.log(token);
  if (!token) throw new ApiError(401, "User unAuthorized");
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  // console.log(decoded);
  req.user = await User.findById(decoded?._id).select("-password");
  if (!req.user) throw new ApiError(401, "user not found");
  next();
});
