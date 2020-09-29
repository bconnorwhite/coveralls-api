import Coveralls, { Service } from "../";
import { getSourceFiles, PostJobFromLCOVArgs, SourceFile } from "./from-lcov";
import { getGitData, GitData } from "./git";

export type PostJobResponse = {
  message: string;
  url: string;
}

/**
 * A hash representing the coverage data from a single run of a test suite. You must specify either `repo_token` or a service name and job id.
 */
export type PostJobBody = {
  /**
   * The secret token for your repository, found at the bottom of your repository’s page on Coveralls.
   */
  repo_token?: string;
  /**
   * A timestamp of when the job ran. If a string is provided, must be parsable by Ruby.
   */
  run_at?: string;
} & PostJobArgs;

export type PostJobArgs = {
  /**
   * An array of source files, including their coverage data.
   */
  source_files: SourceFile[];
} & BaseJobArgs;

export type BaseJobArgs = {
    /**
   * The build number. Will default to chronological numbering from builds on repo.
   */
  service_number?: string;
  /**
   * A unique identifier of the job on the service specified by service_name.
   */
  service_job_id?: string;
  /**
   * The associated pull request ID of the build. Used for updating the status and/or commenting.
   */
  service_pull_request?: string;
  /**
   * If this is set, the build will not be considered done until a webhook has been sent to https://coveralls.io/webhook?repo_token=…
   */
  parallel?: boolean;
  /**
   * If this is set, the job being reported will be named in the view and have it’s own independent status reported to your VCS provider.
   */
  flag_name?: string;
  /**
   * A hash of Git data that can be used to display more information to users.
   */
  git?: GitData;
  /**
   * The current SHA of the commit being built to override the “git” parameter.
   */
  commit_sha?: string;
  /**
   * A timestamp of when the job ran. If a string is provided, must be parsable by Ruby.
   */
  run_at?: Date | string;
}

function hasLCOVPath(args: PostJobArgs | PostJobFromLCOVArgs): args is PostJobFromLCOVArgs {
  return (args as PostJobFromLCOVArgs).lcov_path !== undefined;
}

function getRunAt(date: Date = new Date()) {
  return `${date.toISOString().split(".")[0]}+00:00`;
}

// eslint-disable-next-line max-params
export async function getJobBody(service: Service, user: string, name: string, args: PostJobArgs | PostJobFromLCOVArgs, coveralls: Coveralls) {
  return coveralls.getRepo(service, user, name).then(async (response) => {
    const body: PostJobBody = {
      repo_token: response?.token,
      source_files: [],
      service_number: args.service_number,
      service_job_id: args.service_job_id,
      service_pull_request: args.service_pull_request,
      parallel: args.parallel,
      flag_name: args.flag_name,
      git: args.git ?? await getGitData(),
      commit_sha: args.commit_sha,
      run_at: typeof args.run_at === "string" ? args.run_at : getRunAt(args.run_at)
    }
    if(hasLCOVPath(args)) {
      body.source_files = await getSourceFiles(args.lcov_path);
      return body;
    } else {
      body.source_files = args.source_files;
      return body;
    }
  });
}

export {
  PostJobFromLCOVArgs
}
