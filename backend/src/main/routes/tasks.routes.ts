import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeCreateTaskController } from "../factories/tasks/create-tasks-factory";
import { makeDeleteTaskController } from "../factories/tasks/delete-tasks-factory";

export function setupTasksRoutes(router: Router): void {
  router.post("/tasks", expressRouteAdapter(makeCreateTaskController()));
  router.delete("/tasks/:id", expressRouteAdapter(makeDeleteTaskController()));
}
