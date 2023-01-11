import {
  AddProject,
  AddProjectInput,
} from "../../../../domain/usecases/project/add-project";
import { Project } from "../../../../domain/entities/project";
import { AddProjectRepository } from "../../protocols/add-project.repository";

export class DbAddProject implements AddProject {
  constructor(private readonly addProjectRepository: AddProjectRepository) {}

  async add(project: AddProjectInput): Promise<Project> {
    return await this.addProjectRepository.add(project);
  }
}
