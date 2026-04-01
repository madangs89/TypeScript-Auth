import express from "express";
import type { Request, Response } from "express";
import { MONGO_URI, PORT } from "./config/cofig.dotenv.js";
import { connectDb } from "./config/db/db.connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () => {
  await connectDb(String(MONGO_URI));
  console.log(`Server is running on port ${PORT}`);
});
