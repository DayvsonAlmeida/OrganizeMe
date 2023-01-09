import {
  badRequest,
  Controller,
  Http,
  MissingParamError,
  Task,
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

    throw new Error();
  }
}
