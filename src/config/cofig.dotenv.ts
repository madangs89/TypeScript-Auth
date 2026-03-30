import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV;

if (!PORT) {
  throw new Error("PORT is not defined in the environment variables");
}

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

if (!NODE_ENV) {
  throw new Error("NODE_ENV is not defined in the environment variables");
}

export { PORT, MONGO_URI, JWT_SECRET, NODE_ENV };
