import { Router } from "express";

const urlsRoutes = Router();

urlsRoutes.post("/urls/shorten");
urlsRoutes.get("/urls/:id");
urlsRoutes.get("/urls/open/:shortUrl");
urlsRoutes.delete("/urls/:id");

export { urlsRoutes };
