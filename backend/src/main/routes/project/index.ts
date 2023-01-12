import { Router } from "express";

export function useProjectRoutes(router: Router): void {
  router.post("/projects", (req, res) => {
    return res.send("");
  });
}
