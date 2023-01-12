import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeCreateProjectController } from "../factories/projects/create-project-factory";
import { makeDeleteProjectController } from "../factories/projects/delete-project-factory";

export function setupProjectRoutes(router: Router): void {
  router.post("/projects", expressRouteAdapter(makeCreateProjectController()));
  router.delete(
    "/projects/:id",
    expressRouteAdapter(makeDeleteProjectController())
  );
}
