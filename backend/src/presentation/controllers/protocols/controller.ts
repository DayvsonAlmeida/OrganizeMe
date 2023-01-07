import { Http } from "./http";

export interface Controller {
  handle(request: Http.Request): Promise<Http.Response>;
}
