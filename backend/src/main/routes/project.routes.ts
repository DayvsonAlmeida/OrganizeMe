import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeListProjectController } from "../factories/projects/list-project-factory";
import { makeCreateProjectController } from "../factories/projects/create-project-factory";
import { makeDeleteProjectController } from "../factories/projects/delete-project-factory";

export function setupProjectRoutes(router: Router): void {
  router.get("/projects", expressRouteAdapter(makeListProjectController()));
  router.post("/projects", expressRouteAdapter(makeCreateProjectController()));
  router.delete(
    "/projects/:id",
    expressRouteAdapter(makeDeleteProjectController())
  );
}
