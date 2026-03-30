import mongoose from "mongoose";
import { User as UserType, UserRole } from "../types/user.types.js";

const userSchema = new mongoose.Schema<UserType>({
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

const User = mongoose.model<UserType>("User", userSchema);
export default User;
