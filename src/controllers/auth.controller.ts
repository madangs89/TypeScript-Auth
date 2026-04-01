import type { Request, Response } from "express";
import { LoginRequest, RegisterRequest } from "../types/auth.type.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { User as UserType } from "../types/user.types.js";

import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "../config/cofig.dotenv.js";
import { ApiResponse } from "../types/response.type.js";
const generateToken = (data: UserType) => {
  const token = jwt.sign(
    {
      _id: data._id,
      userName: data.userName,
      email: data.email,
      role: data.role,
    },
    JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return token;
};

const generateCookie = (token: string, res: Response) => {
  const isProduction = NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response<ApiResponse<UserType>>,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const isUserExits = await User.findOne({ email }).lean();

    if (!isUserExits) {
      return res
        .status(404)
        .json({ message: "Provided Details Are Not Matching", success: false });
    }

    if (!isUserExits.password) {
      return res
        .status(404)
        .json({ message: "Provided Details Are Not Matching", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExits.password,
    );

    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ message: "Provided Details Are Not Matching", success: false });
    }

    const token = generateToken(isUserExits);
    generateCookie(token, res);

    const payload = {
      _id: isUserExits._id,
      userName: isUserExits.userName,
      email: isUserExits.email,
      role: isUserExits.role,
    };

    return res
      .status(200)
      .json({ message: "Login successful", success: true, data: payload });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response<ApiResponse<UserType>>,
) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const isUserExits = await User.findOne({ email });

    if (isUserExits) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const payload = {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
    };

    const token = generateToken(newUser);
    generateCookie(token, res);
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      data: payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
