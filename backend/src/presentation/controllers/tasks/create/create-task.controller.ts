import {
  Controller,
  Http,
  badRequest,
  ok,
  serverError,
  MissingParamError,
  InvalidParamError,
  Task,
  AddTask,
  FindProject,
  DeadLineValidator,
  notFound,
  NotFoundError,
} from "./create-task.protocols";

type CreateTaskInput = {
  name: string;
  responsible: string;
  deadLine: string;
  projectId: string;
};

type Request = Http.Request<CreateTaskInput>;
type Response = Http.Response<Task>;

export class CreateTaskController implements Controller<CreateTaskInput, Task> {
  constructor(
    private readonly deadLineValidator: DeadLineValidator,
    private readonly findProject: FindProject,
    private readonly addTask: AddTask
  ) {}

  async handle(request: Request): Promise<Response> {
    const { body } = request;
    const fields = ["name", "responsible", "deadLine", "projectId"];

    if (!body) return badRequest(new MissingParamError("name"));

    const missingParam = fields.reduce((acc, field) => {
      const isMissing = !body[field as keyof CreateTaskInput];
      if (acc || !isMissing) return acc;
      return field;
    }, "");

    if (missingParam) return badRequest(new MissingParamError(missingParam));

    const { deadLine, projectId, name, responsible } = body;

    const isValidDeadLine = this.deadLineValidator.isValid(deadLine);

    if (!isValidDeadLine) return badRequest(new InvalidParamError("deadLine"));

    const [day, month, year] = deadLine.split("/").map((el) => parseInt(el));
    const deadLineDate = new Date(`${year}-${month}-${day}`);

    try {
      const project = await this.findProject.find({ id: projectId });

      if (!project) return notFound(new NotFoundError("project"));

      const task = await this.addTask.add({
        name,
        projectId,
        responsible,
        deadLine: deadLineDate,
      });

      return ok({});
    } catch {
      return serverError();
    }
  }
}
