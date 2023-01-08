import {
  MissingParamError,
  AddProject,
  Project,
  AddProjectInput,
} from "./create-project.protocols";
import { CreateProjectController, Request } from "./create-project.controller";

const makeAddProject = (): AddProject => {
  class AddProjecStub implements AddProject {
    add(project: AddProjectInput): Promise<Project> {
      const result: Project = {
        id: "awesome-id",
        name: "My Project",
      };
      return new Promise((resolve) => resolve(result));
    }
  }
  return new AddProjecStub();
};

type SutTypes = {
  sut: CreateProjectController;
  addProjectStub: AddProject;
};

const makeSut = (): SutTypes => {
  const addProjectStub = makeAddProject();
  return {
    addProjectStub,
    sut: new CreateProjectController(addProjectStub),
  };
};

describe("CreateProject Controller", () => {
  it("should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = { body: {} } as Request;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = { body: { name: "" } };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("should call AddProject with correct values", async () => {
    const { sut, addProjectStub } = makeSut();
    const addSpy = jest.spyOn(addProjectStub, "add");
    const httpRequest = { body: { name: "My Project" } };

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith({ name: "My Project" });
  });
});
