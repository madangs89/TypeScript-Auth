import express from "express";
import type { Request, Response } from "express";
import { MONGO_URI, PORT } from "./config/cofig.dotenv.js";
import { connectDb } from "./config/db/db.connect.js";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () => {
  await connectDb(String(MONGO_URI));
  console.log(`Server is running on port ${PORT}`);
});
