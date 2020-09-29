import crossFetch from "cross-fetch-json";
import { parseJSONObject } from "parse-json-object";
import FormData from "form-data";
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
  private getPath(path: string) {
    return `https://${this.hostname}/api${path}`;
  }
  private fetch<T extends JSONValue>(path: string, method: Method, args?: JSONObject) {
    return crossFetch<T>(this.getPath(path), {
      method,
      headers: {
        authorization: `token ${this.token}`
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
  async postJob(service: Service, user: string, name: string, args: PostJobArgs | PostJobFromLCOVArgs): Promise<PostJobResponse> {
    return getJobBody(service, user, name, args, this).then((body) => {
      const form = new FormData();
      form.append("json", stringify(body));
      return new Promise((resolve) => {
        form.submit(this.getPath("/v1/jobs"), (err, res) => {
          if(err) {
            console.error(err);
          }
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(parseJSONObject<PostJobResponse>(data));
          });
        });
      });
    });
  }
}

export {
  CreateRepoArgs,
  CreateRepoResponse,
  GetRepoResponse,
  UpdateRepoArgs,
  UpdateRepoReponse,
  PostJobArgs,
  PostJobFromLCOVArgs,
  PostJobResponse
}
