import { Project } from "../../entities/project";

export type AddProjectInput = {
  name: string;
};

export interface AddProject {
  add(project: AddProjectInput): Promise<Project>;
}
