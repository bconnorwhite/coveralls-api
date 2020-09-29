<div align="center">
  <h1>coveralls-api</h1>
  <a href="https://npmjs.com/package/coveralls-api">
    <img alt="npm" src="https://img.shields.io/npm/v/coveralls-api.svg">
  </a>  <a href="https://github.com/bconnorwhite/coveralls-api">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/coveralls-api.svg">
  </a>  <a href="https://github.com/bconnorwhite/coveralls-api">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/coveralls-api?label=Stars%20Appreciated%21&style=social">
  </a>  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a></div>

<br />

> API client for [coveralls.io](https://coveralls.io/).

To use coveralls-api, you will need a personal token. Personal tokens can be created on the [Coveralls account page](https://coveralls.io/account).

Full documentation:
- Repos: https://coveralls.io/api/docs
- Jobs: https://docs.coveralls.io/api-reference

## Installation

```bash
yarn add coveralls-api
```

```bash
npm install coveralls-api
```

## API

- [Create Repo](#create-repo)
- [Get Repo](#get-repo)
- [Update Repo](#update-repo)
- [Post Job](#post-job)

### Create Repo

#### Usage

```ts
import Coveralls from "coveralls-api";

const coveralls = new Coveralls(token);

coveralls.createRepo({
  service: "github",
  name: "my-repo-name"
}).then((response) => {
  // ...
});
```

#### Types
```ts
function createRepo(args: CreateRepoArgs): Promise<CreateRepoResponse | undefined>;

type CreateRepoArgs = {
  service: Service;
  name: string;
  comment_on_pull_requests?: boolean;
  send_build_status?: boolean;
  commit_status_fail_threshold?: number | null;
  commit_status_fail_change_threshold?: number | null;
}

type CreateRepoResponse = {
  service: Service;
  name: string;
  comment_on_pull_requests?: boolean;
  send_build_status?: boolean;
  commit_status_fail_threshold?: number | null;
  commit_status_fail_change_threshold?: number | null;
  created_at: string;
  updated_at: string;
}

type Service = "github" | "bitbucket" | "gitlab" | "stash" | "manual";
```

### Get Repo

#### Usage

```ts
import Coveralls from "coveralls-api";

const coveralls = new Coveralls(token);

coveralls.getRepo("github", "my-github-user", "my-repo-name").then((response) => {
  // ...
});
```

#### Types
```ts
function updateRepo(
  service: Service,
  user: string,
  name: string
): Promise<GetRepoReponse | undefined>

type GetRepoResponse = {
  service: Service;
  name: string;
  comment_on_pull_requests?: boolean;
  send_build_status?: boolean;
  commit_status_fail_threshold?: number | null;
  commit_status_fail_change_threshold?: number | null;
  created_at: string;
  updated_at: string;
  id: number;
  has_badge: boolean;
  token?: string;
}
```

### Update Repo

#### Usage

```ts
import Coveralls from "coveralls-api";

const coveralls = new Coveralls(token);

coveralls.updateRepo("github", "my-github-user", "my-repo-name", {
  comment_on_pull_requests: true,
  send_build_status: false
}).then((response) => {
  // ...
});
```

#### Types
```ts
function updateRepo(
  service: Service,
  user: string,
  name: string,
  args: UpdateRepoArgs
): Promise<UpdateRepoReponse | undefined>

type UpdateRepoArgs = {
  comment_on_pull_requests?: boolean;
  send_build_status?: boolean;
  commit_status_fail_threshold?: number | null;
  commit_status_fail_change_threshold?: number | null;
}

type UpdateRepoResponse = {
  service: Service;
  name: string;
  comment_on_pull_requests?: boolean;
  send_build_status?: boolean;
  commit_status_fail_threshold?: number | null;
  commit_status_fail_change_threshold?: number | null;
  created_at: string;
  updated_at: string;
}
```

### Post Job

#### Usage
```ts
import Coveralls from "coveralls-api";

const coveralls = new Coveralls(token);

// From LCOV file:
coveralls.postJob("github", "my-github-user", "my-repo-name", {
  lcov_path: "coverage/lcov.info"
}).then((response) => {
  // ...
});

// From source files:
coveralls.postJob("github", "my-github-user", "my-repo-name", {
  source_files: [{
    name: ...
  }, ...]
}).then((response) => {
  // ...
});
```

#### Types
```ts
function postJob(service: Service, user: string, name: string, args: PostJobArgs | PostJobFromLCOVArgs): Promise<PostJobResponse>;

export type PostJobFromLCOVArgs = {
  lcov_path: string;
} & BaseJobArgs;

export type PostJobArgs = {
  source_files: SourceFile[];
} & BaseJobArgs;

export type SourceFile = {
  name: string;
  source_digest: string;
  coverage: (number | null)[];
  branches?: number[];
  source?: string;
}

type BaseJobArgs = {
  service_number?: string;
  service_job_id?: string;
  service_pull_request?: string;
  parallel?: boolean;
  flag_name?: string;
  git?: {
    head: {
      id: string;
      committer_name: string;
      committer_email: string;
      message: string;
      author_name: string;
      author_email: string;
    };
    branch: string;
    remotes: {
      name: string;
      url: string;
    }[];
  };
  commit_sha?: string;
  run_at?: Date | string;
}
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/coveralls-api.svg"></h2>

- [@bconnorwhite/exec](https://www.npmjs.com/package/@bconnorwhite/exec): Execute commands while keeping flags easily configurable as an object
- [cross-fetch-json](https://www.npmjs.com/package/cross-fetch-json): Universal fetch API that only returns JSON
- [form-data](https://www.npmjs.com/package/form-data): A library to create readable "multipart/form-data" streams. Can be used to submit forms and file uploads to other web applications.
- [md5](https://www.npmjs.com/package/md5): Js function for hashing messages with MD5
- [parse-json-object](https://www.npmjs.com/package/parse-json-object): Parse a typed JSON object
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch.
- [read-lcov-safe](https://www.npmjs.com/package/read-lcov-safe): Read and parse an lcov file without try catch
- [stringify-json-object](https://www.npmjs.com/package/stringify-json-object): Stringify and format a JSON object.

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/coveralls-api.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects
- [@types/md5](https://www.npmjs.com/package/@types/md5): TypeScript definitions for md5
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from .env file

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/coveralls-api.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)
