import { Project } from "@/domain/entities/project";
import { AddProjectInput } from "@/domain/usecases/project/add-project";
import { AddProjectRepository } from "../../protocols/add-project.repository";
import { DbAddProject } from "./db-add-project";

type SutTypes = {
  sut: DbAddProject;
  addProjectRepositoryStub: AddProjectRepository;
};

const makeAddProjectRepository = (): AddProjectRepository => {
  class AddProjectRepositoryStub implements AddProjectRepository {
    add(project: AddProjectInput): Promise<Project> {
      const fakeProject: Project = {
        id: "awesome-id",
        name: project.name,
        tasks: [],
      };

      return new Promise((resolve) => resolve(fakeProject));
    }
  }

  return new AddProjectRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addProjectRepositoryStub = makeAddProjectRepository();
  const sut = new DbAddProject(addProjectRepositoryStub);

  return {
    sut,
    addProjectRepositoryStub,
  };
};

describe("DbAddProject Usecase", () => {
  it("should call AddProjectRepository with correct values", async () => {
    const { sut, addProjectRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addProjectRepositoryStub, "add");
    const projectData = { name: "My Project" };

    await sut.add(projectData);

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledWith({ name: "My Project" });
  });

  it("should throws if AddProjectRepository throws", async () => {
    const { sut, addProjectRepositoryStub } = makeSut();
    const projectData = { name: "My Project" };
    jest
      .spyOn(addProjectRepositoryStub, "add")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const promise = sut.add(projectData);

    await expect(promise).rejects.toThrow();
  });

  it("should return a project on success", async () => {
    const { sut } = makeSut();
    const projectData = { name: "My Project" };

    const project = await sut.add(projectData);

    expect(project).toEqual({
      id: "awesome-id",
      name: "My Project",
      tasks: [],
    });
  });
});
