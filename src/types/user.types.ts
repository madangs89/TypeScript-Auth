export type User = {
  _id: string;
  userName: string;
  email: string;
  role: UserRole;
  password: string;
};
export enum UserRole {
  Admin = "admin",
  User = "user",
}
