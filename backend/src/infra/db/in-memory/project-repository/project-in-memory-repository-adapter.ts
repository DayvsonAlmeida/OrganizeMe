import { Project } from "@/domain/entities/project";
import { AddProjectInput } from "@/domain/usecases/project/add-project";
import { AddProjectRepository } from "@/data/project/protocols/add-project.repository";

import { db, ProjectInMemoryDB } from "../db";

export class ProjectInMemoryRepositoryAdapter implements AddProjectRepository {
  async add(project: AddProjectInput): Promise<Project> {
    const inMemoryProject: ProjectInMemoryDB = {
      name: project.name,
      tasks: [],
    };

    db.push(inMemoryProject);
    const id = db.length.toString();

    return {
      id,
      name: project.name,
    };
  }
}
