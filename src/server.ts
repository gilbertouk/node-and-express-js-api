import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import v1 from "./routes/v1";

export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ ok: true, environment: config.env });
  });

  app.use("/v1", v1);

  return app;
};
