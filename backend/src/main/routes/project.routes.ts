import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeCreateProjectController } from "../factories/projects/create-project-factory";

export function setupProjectRoutes(router: Router): void {
  router.post("/projects", expressRouteAdapter(makeCreateProjectController()));
}
