import {
  Http,
  MissingParamError,
  ServerError,
  DeleteTask,
  DeleteTaskInput,
} from "./delete-task.protocols";
import { DeleteTaskController } from "./delete-task.controller";

const makeDeleteTask = (): DeleteTask => {
  class DeleteTaskStub implements DeleteTask {
    remove(task: DeleteTaskInput): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new DeleteTaskStub();
};

type SutTypes = {
  sut: DeleteTaskController;
  deleteTaskStub: DeleteTask;
};

const makeSut = (): SutTypes => {
  const deleteTaskStub = makeDeleteTask();
  const sut = new DeleteTaskController(deleteTaskStub);
  return {
    sut,
    deleteTaskStub,
  };
};

describe("DeleteTask Controller", () => {
  it("should return 400 if no id is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: Http.Request = { params: {} };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });

  it("should call DeleteTask with correct values", async () => {
    const { sut, deleteTaskStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteTaskStub, "remove");
    const httpRequest: Http.Request = { params: { id: "awesome-id" } };

    await sut.handle(httpRequest);

    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith({ id: "awesome-id" });
  });

  it("should return 500 if DeleteTask throws", async () => {
    const { sut, deleteTaskStub } = makeSut();
    const httpRequest: Http.Request = { params: { id: "awesome-id" } };
    jest
      .spyOn(deleteTaskStub, "remove")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("should return 200 if task is deleted", async () => {
    const { sut } = makeSut();
    const httpRequest: Http.Request = { params: { id: "awesome-id" } };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toBeNull();
  });
});
