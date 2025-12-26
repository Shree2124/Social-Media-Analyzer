import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  accessTokenExpiry,
  accessTokenSecret,
  refreshTokenExpiry,
  refreshTokenSecret,
} from "../../config/settings.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function () {
  if (!accessTokenSecret) {
    throw new Error("Access Token Secret is not defined");
  }

  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: "Admin",
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  if (!refreshTokenSecret) {
    throw new Error("Refresh Token Secret is not defined");
  }

  return jwt.sign(
    {
      _id: this._id,
    },
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiry,
    }
  );
};

export const User = model("User", UserSchema);