import {
  badRequest,
  Controller,
  Http,
  MissingParamError,
  ok,
  serverError,
  ToggleTask,
} from "./toggle-task.protocols";

export type ToggleTaskInput = {
  done: boolean;
};

export type Request = Http.Request<ToggleTaskInput>;

export class ToggleTaskController implements Controller<ToggleTaskInput> {
  constructor(private readonly toggleTask: ToggleTask) {}

  async handle(request: Request): Promise<Http.Response> {
    const { body, params } = request;
    const isMissingParams = !params || !params.id;
    const isMissingField = !body || !body.done;

    if (isMissingParams) return badRequest(new MissingParamError("id"));
    if (isMissingField) return badRequest(new MissingParamError("done"));

    try {
      await this.toggleTask.toggle({ id: params.id, done: body.done });
      return ok({});
    } catch {
      return serverError();
    }
  }
}
