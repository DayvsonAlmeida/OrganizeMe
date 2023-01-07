import { Http } from "./http";

export interface Controller<Req = any, Res = any> {
  handle(request: Http.Request<Req>): Promise<Http.Response<Res>>;
}
