import { Express, Router } from "express";
import { useProjectRoutes } from "../routes/project";

export function setupRoutes(app: Express): void {
  const router = Router();

  app.use("/api", router);
  useProjectRoutes(router);
}
