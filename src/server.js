import express, { json }from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const server = express();

server.use(cors(), json());

server.listen(process.env.PORT, () => {
  console.log(`The server is running on port: ${process.env.PORT}`);
});
