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
const requiredTagRulesPath = path.join(
    repositoryRoot,
    "src",
    "rules",
    "require-tag-rules.ts"
);

const BEGIN_MARKER = "<!-- BEGIN_PRESETS_MATRIX -->";
const END_MARKER = "<!-- END_PRESETS_MATRIX -->";

/**
 * @param {string} sourceText
 *
 * @returns {string[]}
 */
const parseRequiredTagRuleNames = (sourceText) => {
    const ruleNamePattern = /ruleName:\s*"(?<ruleName>[^"]+)"/gu;

    /** @type {string[]} */
    const ruleNames = [];

    for (const match of sourceText.matchAll(ruleNamePattern)) {
        const groups = match.groups;
        if (groups?.["ruleName"] === undefined) {
            continue;
        }

        ruleNames.push(groups["ruleName"]);
    }

    return [...new Set(ruleNames)].sort((left, right) =>
        left.localeCompare(right)
    );
};

/**
 * @param {string} ruleName
 *
 * @returns {string}
 */
const toRuleLink = (ruleName) => `\`tsdoc-require-2/${ruleName}\``;

/**
 * @typedef PresetRow
 *
 * @property {string} name Preset config name exposed by the plugin.
 * @property {string} purpose Human-readable purpose shown in README.
 * @property {string[]} rules Rule names included in the preset.
 */

/**
 * @param {readonly string[]} requiredTagRuleNames
 *
 * @returns {string[]}
 */
const buildPresetRows = (requiredTagRuleNames) => {
    const allRuleNames = ["require", ...requiredTagRuleNames];

    /** @type {PresetRow[]} */
    const presets = [
        {
            name: "recommended",
            purpose: "Minimal baseline TSDoc enforcement.",
            rules: ["require"],
        },
        {
            name: "detailed",
            purpose: "General code docs baseline with remarks included.",
            rules: ["require", "require-remarks"],
        },
        {
            name: "packages",
            purpose: "Library/package-focused baseline for package entry docs.",
            rules: [
                "require",
                "require-remarks",
                "require-package-documentation",
            ],
        },
        {
            name: "all",
            purpose:
                "Enable every rule shipped by this plugin. (NOT RECOMMENDED)",
            rules: allRuleNames,
        },
    ];

    return presets.map((preset) => {
        const includedRules =
            preset.name === "all"
                ? "**All plugin rules**"
                : preset.rules.map(toRuleLink).join(", ");

        return `| \`${preset.name}\` | ${preset.rules.length} | ${includedRules} | ${preset.purpose} |`;
    });
};

/**
 * @param {readonly string[]} requiredTagRuleNames
 *
 * @returns {string}
 */
const buildPresetMatrix = (requiredTagRuleNames) => {
    const header = [
        "| Preset | Rule count | Included rules | Typical use case |",
        "| --- | ---: | --- | --- |",
    ];

    return [...header, ...buildPresetRows(requiredTagRuleNames)].join("\n");
};

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

    const [readmeText, requiredTagRulesText] = await Promise.all([
        readFile(readmePath, "utf8"),
        readFile(requiredTagRulesPath, "utf8"),
    ]);

    const requiredTagRuleNames =
        parseRequiredTagRuleNames(requiredTagRulesText);
    const matrix = buildPresetMatrix(requiredTagRuleNames);
    const updatedReadme = replaceBetweenMarkers(readmeText, matrix);

    if (updatedReadme === readmeText) {
        console.log("README presets matrix is already up-to-date.");
        return;
    }

    if (checkOnly) {
        console.error(
            "README presets matrix is out-of-date. Run: node ./scripts/sync-presets-rules-matrix.mjs"
        );
        process.exitCode = 1;
        return;
    }

    await writeFile(readmePath, updatedReadme, "utf8");
    console.log("Updated README presets matrix.");
};

await main();
