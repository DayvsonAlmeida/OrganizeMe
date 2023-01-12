import { Express, Router } from "express";
import { setupProjectRoutes } from "../routes/project.routes";

export function setupRoutes(app: Express): void {
  const router = Router();

  app.use("/api", router);
  setupProjectRoutes(router);
}
