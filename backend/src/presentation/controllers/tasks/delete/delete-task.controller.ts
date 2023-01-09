import {
  Controller,
  Http,
  badRequest,
  ok,
  serverError,
  MissingParamError,
  DeleteTask,
} from "./delete-task.protocols";

type Response = Http.Response<null>;

export class DeleteTaskController implements Controller<any, null> {
  constructor(private readonly deleteTask: DeleteTask) {}

  async handle(request: Http.Request): Promise<Response> {
    const { params } = request;
    const isMissingField = !params || !params.id;

    if (isMissingField) return badRequest(new MissingParamError("id"));

    try {
      await this.deleteTask.remove({ id: params.id });
      return ok(null);
    } catch {
      return serverError();
    }
  }
}
