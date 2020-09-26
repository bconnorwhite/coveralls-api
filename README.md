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

Full documentation: https://coveralls.io/api/docs

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

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/coveralls-api.svg"></h2>

- [cross-fetch-json](https://www.npmjs.com/package/cross-fetch-json): Universal fetch API that only returns JSON
- [stringify-json-object](https://www.npmjs.com/package/stringify-json-object): Stringify and format a JSON object.

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/coveralls-api.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from .env file

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/coveralls-api.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)
