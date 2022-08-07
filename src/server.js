import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes.js";
import { urlsRoutes } from "./routes/urlRoutes.js";
dotenv.config();

const server = express();

server.use(cors(), json());

server.use(authRoutes);
server.use(urlsRoutes);

server.listen(process.env.PORT, () => {
  console.log(`The server is running on port: ${process.env.PORT}`);
});
