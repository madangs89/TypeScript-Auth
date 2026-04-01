import { User } from "./user.types.js";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  userName: string;
  email: string;
  password: string;
};

export type AuthRequest = Request & {
  user?: User;
};
