import type { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/auth.type.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/cofig.dotenv.js";

export const userMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const token =
      req.cookies?.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);

    req.user = decoded as any;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};