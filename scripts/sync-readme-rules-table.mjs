#!/usr/bin/env node
// @ts-check

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repositoryRoot = path.resolve(__dirname, "..");
const readmePath = path.join(repositoryRoot, "README.md");

const BEGIN_MARKER = "<!-- BEGIN_RULES_TABLE -->";
const END_MARKER = "<!-- END_RULES_TABLE -->";

const rulesSectionBody = [
    "- Rule coverage by preset is documented in the [Preset matrix](#preset-matrix) above.",
    "- For full rule documentation links, see [Rule docs](#rule-docs).",
].join("\n");

/**
 * @param {string} text
 * @param {string} replacementBody
 *
 * @returns {string}
 */
const replaceBetweenMarkers = (text, replacementBody) => {
    const beginIndex = text.indexOf(BEGIN_MARKER);
    const endIndex = text.indexOf(END_MARKER);

    if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
        throw new Error(
            `Could not find valid marker pair ${BEGIN_MARKER} / ${END_MARKER} in README.md`
        );
    }

    const before = text.slice(0, beginIndex + BEGIN_MARKER.length);
    const after = text.slice(endIndex);

    return `${before}\n\n${replacementBody}\n\n${after}`;
};

/** @returns {Promise<void>} */
const main = async () => {
    const args = new Set(process.argv.slice(2));
    const checkOnly = args.has("--check");

    const readmeText = await readFile(readmePath, "utf8");
    const updatedReadme = replaceBetweenMarkers(readmeText, rulesSectionBody);

    if (updatedReadme === readmeText) {
        console.log("README rules section is already up-to-date.");
        return;
    }

    if (checkOnly) {
        console.error(
            "README rules section is out-of-date. Run: node ./scripts/sync-readme-rules-table.mjs"
        );
        process.exitCode = 1;
        return;
    }

    await writeFile(readmePath, updatedReadme, "utf8");
    console.log("Updated README rules section.");
};

await main();
