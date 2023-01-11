import { DeleteProjectInput } from "@/domain/usecases/project/delete-project";
import { DeleteProjectRepository } from "../../protocols/delete-project.repository";
import { DbDeleteProject } from "./db-delete-project";

type SutTypes = {
  sut: DbDeleteProject;
  deleteProjectRepositoryStub: DeleteProjectRepository;
};

const makeDeleteProjectRepository = (): DeleteProjectRepository => {
  class DeleteProjectRepositoryStub implements DeleteProjectRepository {
    delete(project: DeleteProjectInput): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new DeleteProjectRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deleteProjectRepositoryStub = makeDeleteProjectRepository();
  const sut = new DbDeleteProject(deleteProjectRepositoryStub);

  return {
    sut,
    deleteProjectRepositoryStub,
  };
};

describe("DbDeleteProject Usecase", () => {
  it("should call DeleteProjectRepository with correct values", async () => {
    const { sut, deleteProjectRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteProjectRepositoryStub, "delete");
    const projectData = { id: "awesome-id" };

    await sut.remove(projectData);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith({ id: "awesome-id" });
  });

  it("should throws if DeleteProjectRepository throws", async () => {
    const { sut, deleteProjectRepositoryStub } = makeSut();
    const projectData = { id: "awesome-id" };
    jest
      .spyOn(deleteProjectRepositoryStub, "delete")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const promise = sut.remove(projectData);

    await expect(promise).rejects.toThrow();
  });

  it("should return void on success", async () => {
    const { sut } = makeSut();
    const projectData = { id: "awesome-id" };

    const promise = sut.remove(projectData);

    await expect(promise).resolves.not.toThrow();
    await expect(promise).resolves.toBeUndefined();
  });
});
