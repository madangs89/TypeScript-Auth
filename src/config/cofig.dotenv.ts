import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!PORT) {
  throw new Error("PORT is not defined in the environment variables");
}

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

export { PORT, MONGO_URI };
