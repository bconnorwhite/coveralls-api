import crossFetch from "cross-fetch-json";
import stringify, { JSONObject, JSONValue } from "stringify-json-object";
import {
  CreateRepoArgs,
  CreateRepoResponse,
  GetRepoResponse,
  UpdateRepoArgs,
  UpdateRepoReponse
} from "./repo";
import { PostJobArgs, PostJobFromLCOVArgs, PostJobResponse, getJobBody } from "./jobs";

type Method = "POST" | "GET" | "PUT";

export type Service = "github" | "bitbucket" | "gitlab" | "stash" | "manual";

export default class Coveralls {
  token: string;
  hostname: string;
  constructor(token: string, hostname = "coveralls.io") {
    this.token = token;
    this.hostname = hostname;
  }
  private fetch<T extends JSONValue>(path: string, method: Method, args?: JSONObject) {
    return crossFetch<T>(`https://${this.hostname}/api${path}`, {
      method,
      headers: {
        Authorization: `token ${this.token}`
      },
      body: args ? stringify(args) : undefined
    });
  }
  createRepo(repo: CreateRepoArgs) {
    return this.fetch<CreateRepoResponse>("/repos", "POST", { repo });
  }
  getRepo(service: Service, user: string, name: string) {
    return this.fetch<GetRepoResponse>(`/repos/${service}/${user}/${name}`, "GET");
  }
  updateRepo(service: Service, user: string, name: string, args: UpdateRepoArgs) {
    return this.fetch<UpdateRepoReponse>(`/repos/${service}/${user}/${name}`, "PUT", args);
  }
  async postJob(service: Service, user: string, name: string, args: PostJobArgs | PostJobFromLCOVArgs) {
    return getJobBody(service, user, name, args, this).then((body) => {
      return this.fetch<PostJobResponse>("/v1/jobs", "POST", body);
    });
  }
}
