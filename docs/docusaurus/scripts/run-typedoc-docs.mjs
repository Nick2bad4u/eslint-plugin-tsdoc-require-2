import { execSync } from "node:child_process";
import { rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const docsDirectoryPath = resolve(currentDirectoryPath, "..");
const repositoryRootPath = resolve(currentDirectoryPath, "..", "..", "..");

const isLocalMode = process.argv.includes("--local");
const optionsFileName = isLocalMode
    ? "typedoc.local.config.mjs"
    : "typedoc.config.json";

/**
 * Execute TypeDoc in the provided working directory.
 *
 * @param {string} workingDirectoryPath - Absolute path used as the TypeDoc
 *   process cwd.
 */
const runTypedoc = (workingDirectoryPath) => {
    execSync(`npx typedoc --options ${optionsFileName} --cleanOutputDir`, {
        cwd: workingDirectoryPath,
        stdio: "inherit",
    });
};

const requiresWindowsPathWorkaround =
    process.platform === "win32" && /[()]/u.test(repositoryRootPath);

if (!requiresWindowsPathWorkaround) {
    runTypedoc(docsDirectoryPath);
    process.exit(0);
}

const temporaryLinkPath = join(
    tmpdir(),
    "eslint-plugin-tsdoc-require-2-docs-link"
);

rmSync(temporaryLinkPath, { force: true, recursive: true });
symlinkSync(repositoryRootPath, temporaryLinkPath, "junction");

try {
    const linkedDocsDirectoryPath = join(
        temporaryLinkPath,
        "docs",
        "docusaurus"
    );
    runTypedoc(linkedDocsDirectoryPath);
} finally {
    rmSync(temporaryLinkPath, { force: true, recursive: true });
}
