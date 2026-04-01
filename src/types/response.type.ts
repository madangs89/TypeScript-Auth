import { UserRole } from "./user.types.js";

export type ApiResponse<T> = {
  message: string;
  success: boolean;
  data?: T;
};

export type AuthResponse = {
  _id: string;
  userName: string;
  email: string;
  role: UserRole;
};
