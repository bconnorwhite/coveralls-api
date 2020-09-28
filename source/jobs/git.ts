import { exec } from "@bconnorwhite/exec";

// function getBranch() {
//   return exec("git", ["rev-parse", {
//     "abbrev-ref": "HEAD"
//   }]).then((result) => {
//     return result.textOutput.trim();
//   });
// }

// function getCommitInfo() {
//   return exec("git", [{
//     "no-page": "log"
//   }, "-1", {
//     pretty: 'format:"%H,%an,%ae,%s,%cn,%ce"',
//     decorate: "full"
//   }]).then((result) => {
//     const [id, author_name, author_email, message, committer_name, committer_email] = result.textOutput.split(",");
//     return {
//       id,
//       author_name,
//       author_email,
//       message,
//       committer_name,
//       committer_email
//     }
//   });
// }

// function getRemotes() {
//   return exec("git", ["remote", { v: true }]).then((result) => {
//     result.textOutput.split("\n").filter((remote) => {
//       return remote.endsWith("(fetch)");
//     }).map((remote) => {
//       const [name, url] = remote.split(/\s+/);
//       return {
//         name,
//         url
//       }
//     });
//   });
// }

export async function getCommitSHA() {
  return exec("git", ["rev-parse", "HEAD"]).then((result) => {
    return result.textOutput.trim();
  });
}
