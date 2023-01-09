import {
  badRequest,
  Controller,
  Http,
  MissingParamError,
  ok,
} from "./toggle-task.protocols";

export type ToggleTaskInput = {
  concluded: boolean;
};

export type Request = Http.Request<ToggleTaskInput>;

export class ToggleTaskController implements Controller<ToggleTaskInput> {
  async handle(request: Request): Promise<Http.Response> {
    const { body, params } = request;
    const isMissingParams = !params || !params.id;
    const isMissingField = !body || !body.concluded;

    if (isMissingParams) return badRequest(new MissingParamError("id"));
    if (isMissingField) return badRequest(new MissingParamError("concluded"));

    return ok({});
  }
}
