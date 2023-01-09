import { Project } from "../../../../domain/entities/project";
import { ServerError } from "../../../errors";
import { CreateTaskController } from "./create-task.controller";
import {
  MissingParamError,
  InvalidParamError,
  NotFoundError,
  DeadLineValidator,
  FindProject,
  FindProjectInput,
  AddTask,
  AddTaskInput,
  Task,
} from "./create-task.protocols";

const makeDeadLineValidator = (): DeadLineValidator => {
  class DeadLineValidatorStub implements DeadLineValidator {
    isValid(deadLine: string): boolean {
      return true;
    }
  }

  return new DeadLineValidatorStub();
};

const makeFindProject = (): FindProject => {
  class FindProjectStub implements FindProject {
    async find({ id }: FindProjectInput): Promise<Project | null> {
      return {
        id,
        name: "Awesome Project",
      };
    }
  }

  return new FindProjectStub();
};

const makeAddTask = (): AddTask => {
  class AddTaskStub implements AddTask {
    async add({
      deadLine,
      name,
      responsible,
      projectId,
    }: AddTaskInput): Promise<Task> {
      return {
        id: "awesome-task-id",
        deadLine,
        name,
        responsible,
      };
    }
  }

  return new AddTaskStub();
};

type SutTypes = {
  sut: CreateTaskController;
  deadLineValidatorStub: DeadLineValidator;
  findProjectStub: FindProject;
  addTaskStub: AddTask;
};

const makeSut = (): SutTypes => {
  const deadLineValidatorStub = makeDeadLineValidator();
  const findProjectStub = makeFindProject();
  const addTaskStub = makeAddTask();
  const sut = new CreateTaskController(
    deadLineValidatorStub,
    findProjectStub,
    addTaskStub
  );

  return {
    deadLineValidatorStub,
    findProjectStub,
    addTaskStub,
    sut,
  };
};

describe("CreateTask Controller", () => {
  it("should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("should return 400 if no responsible is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("responsible"));
  });

  it("should return 400 if no deadLine is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "",
        projectId: "awesome-id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("deadLine"));
  });

  it("should return 400 if no projectId is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("projectId"));
  });

  it("should call deadLineValidator with correct values", async () => {
    const { sut, deadLineValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(deadLineValidatorStub, "isValid");
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledTimes(1);
    expect(isValidSpy).toHaveBeenCalledWith("13/01/2023");
  });

  it("should return 400 if invalid deadLineValidator is provided", async () => {
    const { sut, deadLineValidatorStub } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };
    jest
      .spyOn(deadLineValidatorStub, "isValid")
      .mockImplementationOnce(() => false);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("deadLine"));
  });

  it("should call findProject with correct values", async () => {
    const { sut, findProjectStub } = makeSut();
    const findSpy = jest.spyOn(findProjectStub, "find");
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    await sut.handle(httpRequest);

    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith({ id: "awesome-id" });
  });

  it("should return 404 if a nonexistent projectId is provided", async () => {
    const { sut, findProjectStub } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    jest
      .spyOn(findProjectStub, "find")
      .mockImplementationOnce(async () => null);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual(new NotFoundError("project"));
  });

  it("should return 500 if findProject throws", async () => {
    const { sut, findProjectStub } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    jest
      .spyOn(findProjectStub, "find")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("should call addTask with correct values", async () => {
    const { sut, addTaskStub } = makeSut();
    const addSpy = jest.spyOn(addTaskStub, "add");
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledWith({
      name: "Join to the 104th Training Corps",
      responsible: "Eren",
      deadLine: new Date("2023-1-13"),
      projectId: "awesome-id",
    });
  });

  it("should return 500 if addTask throws", async () => {
    const { sut, addTaskStub } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    jest
      .spyOn(addTaskStub, "add")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("should return 200", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      name: "Join to the 104th Training Corps",
      responsible: "Eren",
      deadLine: new Date("2023-1-13"),
      id: "awesome-task-id",
    });
  });
});
