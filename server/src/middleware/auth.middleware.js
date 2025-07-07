import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  // ? check token in cookie
  if (req?.cookies && req?.cookies?.token) {
    token = req.cookies.token;
  }
  if (!token) throw new ApiError(401, "User unAuthorized");
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  req.user = await User.findById(decoded?._id).select("-password");
  if (!req.user) throw new ApiError(401, "user not found");
  next();
});
