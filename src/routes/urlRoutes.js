import { Router } from "express";
import { createShortUrl } from "../controllers/urlController.js";
import { urlMiddleware } from "../middlewares/urlMiddlweware.js";
import { validateToken } from "../middlewares/validateToken.js";

const urlsRoutes = Router();

urlsRoutes.post("/urls/shorten", urlMiddleware, validateToken, createShortUrl);
urlsRoutes.get("/urls/:id");
urlsRoutes.get("/urls/open/:shortUrl");
urlsRoutes.delete("/urls/:id");

export { urlsRoutes };
