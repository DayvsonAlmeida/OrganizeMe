import { useContext } from "react";
import { ProjectsContext } from "../contexts/projects";

export function useProjects() {
  return useContext(ProjectsContext);
}
