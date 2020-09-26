import dotenv from "dotenv";
import { expect, test } from "@jest/globals";
import Coveralls from "../source";

const config = dotenv.config().parsed;

if(config !== undefined) {
  const coveralls = new Coveralls(config["COVERALLS_TOKEN"]);

  test("get repo", () => {
    coveralls.getRepo("github", "bconnorwhite", "exec").then((result) => {
      expect(result?.service).toBe("github");
      expect(result?.name).toBe("bconnorwhite/exec");
    });
  });
}
