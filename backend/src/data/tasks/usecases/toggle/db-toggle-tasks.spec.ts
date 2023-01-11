import { Task } from "@/domain/entities/task";
import { ToggleTaskInput } from "@/domain/usecases/tasks/toggle-task";
import { ToggleTasksRepository } from "@/data/tasks/protocols/toggle-tasks.repository";
import { DbToggleTasks } from "./db-toggle-tasks";

type SutTypes = {
  sut: DbToggleTasks;
  toggleTasksRepositoryStub: ToggleTasksRepository;
};

const makeToggleTasksRepository = (): ToggleTasksRepository => {
  class ToggleTasksRepositoryStub implements ToggleTasksRepository {
    toggle(task: ToggleTaskInput): Promise<Task> {
      const fakeTask: Task = {
        id: task.id,
        responsible: "Eren",
        name: "Join to the 104th Training Corps",
        deadLine: new Date("2023-1-13"),
        done: task.done,
      };

      return new Promise((resolve) => resolve(fakeTask));
    }
  }

  return new ToggleTasksRepositoryStub();
};

const makeSut = (): SutTypes => {
  const toggleTasksRepositoryStub = makeToggleTasksRepository();
  const sut = new DbToggleTasks(toggleTasksRepositoryStub);

  return {
    sut,
    toggleTasksRepositoryStub,
  };
};

describe("DbToggleTasks Usecase", () => {
  it("should call ToggleTasksRepository with correct values", async () => {
    const { sut, toggleTasksRepositoryStub } = makeSut();
    const toggleSpy = jest.spyOn(toggleTasksRepositoryStub, "toggle");
    const taskData: ToggleTaskInput = {
      id: "awesome-id",
      done: true,
    };

    await sut.toggle(taskData);

    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledWith({
      id: "awesome-id",
      done: true,
    });
  });

  it("should throws if ToggleTasksRepository throws", async () => {
    const { sut, toggleTasksRepositoryStub } = makeSut();
    const taskData: ToggleTaskInput = {
      id: "awesome-id",
      done: true,
    };
    jest
      .spyOn(toggleTasksRepositoryStub, "toggle")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const promise = sut.toggle(taskData);

    await expect(promise).rejects.toThrow();
  });

  it("should return a task on success", async () => {
    const { sut } = makeSut();
    const taskData: ToggleTaskInput = {
      id: "awesome-id",
      done: true,
    };

    const task = await sut.toggle(taskData);

    expect(task).toEqual({
      id: "awesome-id",
      responsible: "Eren",
      name: "Join to the 104th Training Corps",
      deadLine: new Date("2023-1-13"),
      done: true,
    });
  });
});
