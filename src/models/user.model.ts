import mongoose from "mongoose";
import { User, UserRole } from "../types/user.types.js";

const userSchema = new mongoose.Schema<User>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
  },
  password: {
    type: String,
    required: true,
  },
});
