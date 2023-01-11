import { Task } from "@/domain/entities/task";
import { AddTaskInput } from "@/domain/usecases/tasks/add-task";
import { AddTasksRepository } from "@/data/tasks/protocols/add-tasks.repository";
import { DbAddTasks } from "./db-add-tasks";

type SutTypes = {
  sut: DbAddTasks;
  addTasksRepositoryStub: AddTasksRepository;
};

const makeAddTasksRepository = (): AddTasksRepository => {
  class AddTasksRepositoryStub implements AddTasksRepository {
    add(task: AddTaskInput): Promise<Task> {
      const fakeTask: Task = {
        id: "awesome-id",
        name: task.name,
        responsible: task.responsible,
        deadLine: task.deadLine,
        done: false,
      };

      return new Promise((resolve) => resolve(fakeTask));
    }
  }

  return new AddTasksRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addTasksRepositoryStub = makeAddTasksRepository();
  const sut = new DbAddTasks(addTasksRepositoryStub);

  return {
    sut,
    addTasksRepositoryStub,
  };
};

describe("DbAddTasks Usecase", () => {
  it("should call AddTasksRepository with correct values", async () => {
    const { sut, addTasksRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addTasksRepositoryStub, "add");
    const taskData: AddTaskInput = {
      responsible: "Eren",
      name: "Join to the 104th Training Corps",
      deadLine: new Date("2023-1-13"),
      projectId: "awesome-project-id",
    };

    await sut.add(taskData);

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledWith({
      responsible: "Eren",
      name: "Join to the 104th Training Corps",
      deadLine: new Date("2023-1-13"),
      projectId: "awesome-project-id",
    });
  });

  it("should throws if AddTasksRepository throws", async () => {
    const { sut, addTasksRepositoryStub } = makeSut();
    const taskData: AddTaskInput = {
      responsible: "Eren",
      name: "Join to the 104th Training Corps",
      deadLine: new Date("2023-1-13"),
      projectId: "awesome-project-id",
    };
    jest
      .spyOn(addTasksRepositoryStub, "add")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const promise = sut.add(taskData);

    await expect(promise).rejects.toThrow();
  });

  it("should return a task on success", async () => {
    const { sut } = makeSut();
    const taskData: AddTaskInput = {
      responsible: "Eren",
      name: "Join to the 104th Training Corps",
      deadLine: new Date("2023-1-13"),
      projectId: "awesome-project-id",
    };

    const task = await sut.add(taskData);

    expect(task).toEqual({
      id: "awesome-id",
      responsible: "Eren",
      name: "Join to the 104th Training Corps",
      deadLine: new Date("2023-1-13"),
      done: false,
    });
  });
});
