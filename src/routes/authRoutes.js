import { Router } from "express";
import { signUpUsers } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/signup", signUpUsers);
authRoutes.post("/signin");

export { authRoutes };