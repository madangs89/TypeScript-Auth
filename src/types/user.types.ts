import { Types } from "mongoose";

export type User = {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  role: UserRole;
  password?: string;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}
