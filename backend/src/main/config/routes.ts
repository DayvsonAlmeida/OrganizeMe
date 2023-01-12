import { Express, Router } from "express";
import { setupProjectRoutes } from "../routes/project.routes";
import { setupTasksRoutes } from "../routes/tasks.routes";

export function setupRoutes(app: Express): void {
  const router = Router();

  app.use("/api", router);
  setupProjectRoutes(router);
  setupTasksRoutes(router);
}
