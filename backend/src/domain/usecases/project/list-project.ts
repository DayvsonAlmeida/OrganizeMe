import { Project } from "../../entities/project";

export interface ListProject {
  list(): Promise<Project[]>;
}
