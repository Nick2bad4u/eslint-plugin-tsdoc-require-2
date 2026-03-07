import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const OUTPUT_FLAG = "--output";

const parseOutputPath = (argumentsList) => {
  const outputFlagIndex = argumentsList.indexOf(OUTPUT_FLAG);
  if (outputFlagIndex < 0) {
    return "temp/release-notes.md";
  }

  const outputPath = argumentsList[outputFlagIndex + 1];
  if (outputPath === undefined || outputPath.trim().length === 0) {
    throw new Error("The --output flag requires a file path.");
  }

  return outputPath;
};

const outputPath = parseOutputPath(process.argv.slice(2));
const outputFilePath = resolve(outputPath);

let changelogBody = "# Release Notes\n\n";

try {
  const { stdout } = await execFileAsync("git", [
    "log",
    "--pretty=format:- %s (%h)",
    "--max-count=30",
  ]);

  if (stdout.trim().length > 0) {
    changelogBody += `${stdout.trim()}\n`;
  } else {
    changelogBody += "- No commit messages were available for release notes generation.\n";
  }
} catch {
  changelogBody += "- Release notes could not be generated from git history in this environment.\n";
}

await mkdir(dirname(outputFilePath), { recursive: true });
await writeFile(outputFilePath, changelogBody, "utf8");

console.log(`Release notes written to ${outputFilePath}`);
