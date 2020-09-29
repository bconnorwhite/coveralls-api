import { resolve } from "path";
import md5 from "md5";
import { readFile } from "read-file-safe";
import { readLCOV, BranchesDetails, LinesDetails } from "read-lcov-safe";
import { BaseJobArgs } from "./";

export type PostJobFromLCOVArgs = {
  /**
   * Path to lcov.info file
   */
  lcov_path: string;
} & BaseJobArgs;

/**
 * A hash representing a source code file and its coverage data for a single job.
 */
export type SourceFile = {
  /**
   * Represents the file path of this source file. Must be unique in the job. Can include slashes.
   * The file type for syntax highlighting will be determined from the file extension in this parameter.
   */
  name: string;
  /**
   * The MD5 digest of the full source code of this file.
   */
  source_digest: string;
  /**
   * The coverage data for this file for the file’s job.The item at index 0 represents the coverage for line 1 of the source code.
   * Acceptable values in the array:
   * - A positive integer if the line is covered, representing the number of times the line is hit during the test suite.
   * - 0 if the line is not covered by the test suite.
   * - null to indicate the line is not relevant to code coverage (it may be whitespace or a comment).
   */
  coverage: (number | null)[];
  /**
   * The branch data for this file for the file’s job. Each branch is represented by 4 elements in the array:
   * ```
   * [line-number, block-number, branch-number, hits, line-number-2, block-number-2, branch-number-2, hits-2,...]
   * ```
   * Acceptable values in the array:
   * Positive integers if the branch is covered, representing the number of times the branch is hit during the test suite.
   */
  branches?: number[];
  /**
   * The contents of the source file.
   */
  source?: string;
}

function getCoverage(details: LinesDetails[], length: number) {
  return details.reduce((coverage, { line, hit }) => {
    coverage[line-1] = hit;
    return coverage;
  }, new Array(length).fill(null) as (number | null)[]);
}

function getBranches(details: BranchesDetails[]) {
  return details.reduce((branches, item) => {
    branches.push(item.line);
    branches.push(item.block);
    branches.push(item.branch);
    branches.push(item.taken);
    return branches
  }, [] as number[]);
}

export async function getSourceFiles(lcov_path: string): Promise<SourceFile[]> {
  return readLCOV(lcov_path).then(async (records) => {
    return Promise.all(records.map(async (record) => {
      const path = resolve(process.cwd(), record.file);
      return readFile(path).then((source = "") => {
        const { length } = source.split("\n");
        return {
          name: record.file,
          source_digest: md5(source),
          coverage: getCoverage(record.lines.details, length),
          branches: getBranches(record.branches.details),
          source
        }
      });
    }));
  });
}
