import {
  Http,
  MissingParamError,
  ServerError,
  DeleteProject,
  DeleteProjectInput,
} from "./delete-project.protocols";
import { DeleteProjectController } from "./delete-project.controller";

const makeDeleteProject = (): DeleteProject => {
  class DeleteProjecStub implements DeleteProject {
    remove(project: DeleteProjectInput): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new DeleteProjecStub();
};

type SutTypes = {
  sut: DeleteProjectController;
  deleteProjectStub: DeleteProject;
};

const makeSut = (): SutTypes => {
  const deleteProjectStub = makeDeleteProject();
  const sut = new DeleteProjectController(deleteProjectStub);
  return {
    sut,
    deleteProjectStub,
  };
};

describe("DeleteProject Controller", () => {
  it("should return 400 if no id is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: Http.Request = { params: {} };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });

  it("should call DeleteProject with correct values", async () => {
    const { sut, deleteProjectStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteProjectStub, "remove");
    const httpRequest: Http.Request = { params: { id: "awesome-id" } };

    await sut.handle(httpRequest);

    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith({ id: "awesome-id" });
  });

  it("should return 500 if DeleteProject throws", async () => {
    const { sut, deleteProjectStub } = makeSut();
    const httpRequest: Http.Request = { params: { id: "awesome-id" } };
    jest
      .spyOn(deleteProjectStub, "remove")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("should return 200 if project is deleted", async () => {
    const { sut } = makeSut();
    const httpRequest: Http.Request = { params: { id: "awesome-id" } };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toBeNull();
  });
});
