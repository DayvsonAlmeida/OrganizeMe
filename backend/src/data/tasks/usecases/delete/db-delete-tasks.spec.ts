import { DeleteTaskInput } from "@/domain/usecases/tasks/delete-task";
import { DeleteTasksRepository } from "@/data/tasks/protocols/delete-tasks.repository";
import { DbDeleteTasks } from "./db-delete-tasks";

type SutTypes = {
  sut: DbDeleteTasks;
  deleteTasksRepositoryStub: DeleteTasksRepository;
};

const makeDeleteTasksRepository = (): DeleteTasksRepository => {
  class DeleteTasksRepositoryStub implements DeleteTasksRepository {
    delete(task: DeleteTaskInput): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new DeleteTasksRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deleteTasksRepositoryStub = makeDeleteTasksRepository();
  const sut = new DbDeleteTasks(deleteTasksRepositoryStub);

  return {
    sut,
    deleteTasksRepositoryStub,
  };
};

describe("DbDeleteTasks Usecase", () => {
  it("should call DeleteTasksRepository with correct values", async () => {
    const { sut, deleteTasksRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteTasksRepositoryStub, "delete");
    const taskData: DeleteTaskInput = {
      id: "awesome-task-id",
    };

    await sut.remove(taskData);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith({
      id: "awesome-task-id",
    });
  });

  it("should throws if DeleteTasksRepository throws", async () => {
    const { sut, deleteTasksRepositoryStub } = makeSut();
    const taskData: DeleteTaskInput = { id: "awesome-task-id" };
    jest
      .spyOn(deleteTasksRepositoryStub, "delete")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const promise = sut.remove(taskData);

    await expect(promise).rejects.toThrow();
  });

  it("should return void on success", async () => {
    const { sut } = makeSut();
    const taskData: DeleteTaskInput = { id: "awesome-task-id" };

    const promise = sut.remove(taskData);

    await expect(promise).resolves.not.toThrow();
    await expect(promise).resolves.toBeUndefined();
  });
});
