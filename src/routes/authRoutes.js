import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup");
authRoutes.post("/signin");

export { authRoutes };