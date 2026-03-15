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

const BEGIN_MARKER = "<!-- BEGIN_RULES_TABLE -->";
const END_MARKER = "<!-- END_RULES_TABLE -->";

/** @type {readonly ["recommended", "detailed", "packages", "all"]} */
const PRESET_NAMES = [
    "recommended",
    "detailed",
    "packages",
    "all",
];

/**
 * @param {string} ruleName
 *
 * @returns {string}
 */
const docsPathFromRuleName = (ruleName) =>
    `docs/rules/required-tags/${ruleName}.md`;

/**
 * @typedef RuleRow
 *
 * @property {string} ruleName ESLint rule name without the plugin prefix.
 * @property {string} docsPath Repository-relative markdown doc path.
 * @property {string} description Short rule description used in the README
 *   table.
 */

/**
 * @param {string} sourceText
 *
 * @returns {RuleRow[]}
 */
const parseRequiredTagDefinitions = (sourceText) => {
    const definitionPattern =
        /\{\s*ruleName:\s*"(?<ruleName>[^"]+)"\s*,\s*tagName:\s*"(?<tagName>[^"]+)"\s*,?\s*\}/gu;

    /** @type {RuleRow[]} */
    const definitions = [];

    for (const match of sourceText.matchAll(definitionPattern)) {
        const groups = match.groups;

        if (
            groups === undefined ||
            groups["ruleName"] === undefined ||
            groups["tagName"] === undefined
        ) {
            continue;
        }

        definitions.push({
            description: `require ${groups["tagName"]} tag in TSDoc blocks`,
            docsPath: docsPathFromRuleName(groups["ruleName"]),
            ruleName: groups["ruleName"],
        });
    }

    return definitions;
};

/**
 * @param {readonly string[]} ruleNames
 *
 * @returns {{
 *     recommended: ReadonlySet<string>;
 *     detailed: ReadonlySet<string>;
 *     packages: ReadonlySet<string>;
 *     all: ReadonlySet<string>;
 * }}
 */
const getPresetMembership = (ruleNames) => {
    const allRuleNames = new Set(ruleNames);

    return {
        all: allRuleNames,
        detailed: new Set(["require", "require-remarks"]),
        packages: new Set([
            "require",
            "require-package-documentation",
            "require-remarks",
        ]),
        recommended: new Set(["require"]),
    };
};

/**
 * @param {boolean} enabled
 *
 * @returns {string}
 */
const toCheckmark = (enabled) => (enabled ? "✅" : "—");

/**
 * @param {RuleRow} rule
 *
 * @returns {string}
 */
const toRuleLink = ({ docsPath, ruleName }) =>
    `[\`tsdoc-require-2/${ruleName}\`](./${docsPath})`;

/**
 * @param {readonly RuleRow[]} rules
 *
 * @returns {string}
 */
const buildRulesTable = (rules) => {
    const header = [
        "| Rule | Description | Recommended | Detailed | Packages | All |",
        "| --- | --- | :---: | :---: | :---: | :---: |",
    ];

    const membership = getPresetMembership(rules.map((rule) => rule.ruleName));

    const rows = rules.map((rule) => {
        const cells = [
            toRuleLink(rule),
            rule.description,
            ...PRESET_NAMES.map(
                /** @param {"recommended" | "detailed" | "packages" | "all"} presetName */
                (presetName) => {
                    const presetMembers = membership[presetName];

                    return toCheckmark(presetMembers.has(rule.ruleName));
                }
            ),
        ];

        return `| ${cells.join(" | ")} |`;
    });

    return [...header, ...rows].join("\n");
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

    const requiredTagRules = parseRequiredTagDefinitions(requiredTagRulesText);
    requiredTagRules.sort((left, right) =>
        left.ruleName.localeCompare(right.ruleName)
    );

    const allRules = [
        {
            description:
                "require TSDoc comments for exported TypeScript declarations and default exports, with opt-in non-exported support.",
            docsPath: "docs/rules/require.md",
            ruleName: "require",
        },
        ...requiredTagRules,
    ];

    const table = buildRulesTable(allRules);
    const updatedReadme = replaceBetweenMarkers(readmeText, table);

    if (updatedReadme === readmeText) {
        console.log("README rules table is already up-to-date.");
        return;
    }

    if (checkOnly) {
        console.error(
            "README rules table is out-of-date. Run: node ./scripts/sync-readme-rules-table.mjs"
        );
        process.exitCode = 1;
        return;
    }

    await writeFile(readmePath, updatedReadme, "utf8");
    console.log("Updated README rules table.");
};

await main();
