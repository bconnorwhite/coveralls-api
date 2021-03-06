import { Service } from "./";

type RepoIdentifiers = {
  /**
   * Git provider. Options include: github, bitbucket, gitlab, stash, manual
   */
  service: Service;
  /**
   * Name of the repo. E.g. with Github, this is username/reponame.
   */
  name: string;
}

type RepoProperties = {
  /**
   * Whether comments should be posted on pull requests (defaults to true)
   */
  comment_on_pull_requests: boolean;
  /**
   * Whether build status should be sent to the git provider (defaults to true)
   */
  send_build_status: boolean;
  /**
   * Minimum coverage that must be present on a build for the build to pass (default is null, meaning any decrease is a failure)
   */
  commit_status_fail_threshold: number | null;
  /**
   * If coverage decreases, the maximum allowed amount of decrease that will be allowed for the build to pass (default is null, meaning that any decrease is a failure)
   */
  commit_status_fail_change_threshold: number | null;
}

type RepoResponseFields = {
  /**
   * Timestamp of the creation of this Repo
   */
  created_at: string;
  /**
   * Timestamp of the last modification to this Repo
   */
  updated_at: string;
}

type RepoResponse = RepoIdentifiers & RepoProperties & RepoResponseFields;

export type CreateRepoArgs = RepoIdentifiers & Partial<RepoProperties>;

export type CreateRepoResponse = {
  repo: RepoResponse;
}

export type UpdateRepoArgs = {
  repo: Partial<RepoProperties>;
}

export type UpdateRepoReponse = {
  repo: RepoResponse;
}

export type GetRepoResponse = RepoResponse & {
  id: number;
  has_badge: boolean;
  /**
   * Repo Token (only available if you have access)
   */
  token?: string;
};
