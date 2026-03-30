import type { Request, Response } from "express";
import { LoginRequest } from "../interface/auth.type.js";
import User from "../models/user.model.js";
export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const isUserExits = await User.findOne({ email });

    if (!isUserExits) {
      return res
        .status(404)
        .json({ message: "Provided Details Are Not Matching", success: false });
    }

    



    return res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
