import {
  FindProject,
  FindProjectInput,
} from "../../../../domain/usecases/project/find-project";
import { Project } from "../../../../domain/entities/project";
import { FindProjectRepository } from "../../protocols/find-project.repository";

export class DbFindProject implements FindProject {
  constructor(private readonly findProjectRepository: FindProjectRepository) {}

  async find({ id }: FindProjectInput): Promise<Project | null> {
    return this.findProjectRepository.find({ id });
  }
}
