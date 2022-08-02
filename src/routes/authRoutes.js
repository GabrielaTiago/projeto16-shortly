import { Router } from "express";
import { signUpUsers } from "../controllers/authController.js";
import { signUpMiddleware } from "../middlewares/signUpMiddlewares.js";

const authRoutes = Router();

authRoutes.post("/signup", signUpMiddleware,signUpUsers);
authRoutes.post("/signin");

export { authRoutes };