import express from "express";
import { userMiddleware } from "../middelwares/user.middelwares.js";
import { isAuth } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.get("/is-auth", userMiddleware, isAuth);

export default authRoutes;
