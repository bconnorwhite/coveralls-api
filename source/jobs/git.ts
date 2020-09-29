import { exec } from "@bconnorwhite/exec";

type GitHead = {
  id?: string;
  committer_name?: string;
  committer_email?: string;
  message?: string;
  author_name?: string;
  author_email?: string;
}

type GitRemote = {
  name?: string;
  url?: string;
}

export type GitData = {
  head?: GitHead;
  branch?: string;
  remotes?: GitRemote[];
}

async function getBranch() {
  return exec("git", ["rev-parse", {
    "abbrev-ref": "HEAD"
  }], {
    silent: true
  }).then((result) => {
    return result.textOutput.trim();
  });
}

async function getCommitInfo(): Promise<GitHead> {
  return exec("git", [{
    "no-pager": "log"
  }, "-1", {
    "pretty=format:'%H,%an,%ae,%s,%cn,%ce'": true,
    "decorate=full": true
  }], {
    silent: true
  }).then((result) => {
    const [id, author_name, author_email, message, committer_name, committer_email] = result.textOutput.replace(/^(')|(')$/g, "").split(",");
    return {
      id,
      author_name,
      author_email,
      message,
      committer_name,
      committer_email
    }
  });
}

async function getRemotes(): Promise<GitRemote[]> {
  return exec("git", ["remote", { v: true }], { silent: true }).then((result) => {
    return result.textOutput.split("\n").filter((remote) => {
      return remote.endsWith("(fetch)");
    }).map((remote) => {
      const [name, url] = remote.split(/\s+/);
      return {
        name,
        url
      }
    });
  });
}

export async function getGitData() {
  return {
    head: await getCommitInfo(),
    branch: await getBranch(),
    remotes: await getRemotes()
  }
}
