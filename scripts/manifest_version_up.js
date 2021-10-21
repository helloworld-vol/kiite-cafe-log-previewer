const fs = require("fs");
const util = require("util");
const childProcess = require("child_process");
const manifestJSON = require("../public/manifest.json");

const exec = util.promisify(childProcess.exec);
const writeFile = util.promisify(fs.writeFile);

const main = async () => {
  let [major, minor, patch] = manifestJSON.version
    .split(".")
    .map((v) => parseInt(v) || 0);

  switch (process.argv[2]) {
    case "major":
      ++major;
      minor = 0;
      patch = 0;
      break;

    case "minor":
      ++minor;
      patch = 0;
      break;

    default:
      ++patch;
      break;
  }

  manifestJSON.version = [major, minor, patch].join(".");

  const manifestJSONPath = process.cwd() + "/public/manifest.json";

  await writeFile(manifestJSONPath, JSON.stringify(manifestJSON, null, 2));

  const vesionupComment = `chore: 🤖 manifest.json version up to v${manifestJSON.version}`;

  console.log(`\n\u001b[32m🎉 ${vesionupComment} 🎉\u001b[0m\n`);

  await exec(`git add ${manifestJSONPath}`);
  const { stdout } = await exec(`git commit -m "${vesionupComment}"`);

  console.log(stdout);
};

main().catch(console.error);
