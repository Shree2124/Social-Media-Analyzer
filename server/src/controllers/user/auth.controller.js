import { User } from "../../models/user/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.util.js";
import { ApiError } from "../../utils/ApiError.util.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {
  jwtSecret,
  options,
  refreshTokenSecret,
} from "../../config/settings.js";
import { generateAccessAndRefreshTokens } from "../../utils/createRefreshAndAccessToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !username || !email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(400, "User with this email or username already exists");
  }

  const user = new User({
    username,
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if ((!username || !email) && !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

export { createUser, loginUser };
