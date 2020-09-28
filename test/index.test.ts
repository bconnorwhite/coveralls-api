import dotenv from "dotenv";
import { expect, test } from "@jest/globals";
import Coveralls from "../source";
import { getJobBody } from "../source/jobs";
import { getSourceFiles } from "../source/jobs/from-lcov";

const config = dotenv.config().parsed;

if(config !== undefined) {
  const coveralls = new Coveralls(config["COVERALLS_TOKEN"]);

  test("update repo", () => {
    coveralls.updateRepo("github", "bconnorwhite", "coveralls-api", {
      repo: {
        comment_on_pull_requests: false
      }
    }).then((result) => {
      expect(result?.repo.service).toBe("github");
      expect(result?.repo.name).toBe("bconnorwhite/coveralls-api");
      expect(result?.repo.comment_on_pull_requests).toBe(false);
    });
  });

  test("get repo", () => {
    coveralls.getRepo("github", "bconnorwhite", "coveralls-api").then((result) => {
      expect(result?.service).toBe("github");
      expect(result?.name).toBe("bconnorwhite/coveralls-api");
      expect(result?.comment_on_pull_requests).toBe(false);
    });
  });

  test("get job body source files", async () => {
    return getJobBody("github", "bconnorwhite", "coveralls-api", {
      source_files: [],
      run_at: `${new Date().toISOString().split(".")[0]}+00:00`
    }, coveralls).then((body) => {
      expect(Array.isArray(body.source_files)).toBe(true);
      expect(typeof body.run_at).toBe("string");
    });
  });

  test("get job body lcov path", async () => {
    return getJobBody("github", "bconnorwhite", "coveralls-api", {
      lcov_path: "./test/lcov.info"
    }, coveralls).then((body) => {
      expect(Array.isArray(body.source_files)).toBe(true);
      expect(typeof body.run_at).toBe("string");
    });
  });

  test("get source files", async () => {
    return getSourceFiles("./test/lcov.info").then((sourceFiles) => {
      expect(Array.isArray(sourceFiles)).toBe(true);
      expect(sourceFiles[0].name).toBe("source/index.ts");
    });
  });
}
