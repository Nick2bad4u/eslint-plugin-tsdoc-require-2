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
const presetsOverviewPath = path.join(
    repositoryRoot,
    "docs",
    "rules",
    "presets",
    "index.md"
);
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
 * @typedef PresetDefinition
 *
 * @property {string} configKey
 * @property {string} description
 * @property {string} emoji
 * @property {string} name
 * @property {readonly string[]} rules
 * @property {string} slug
 */

const websiteRulesBaseUrl =
    "https://nick2bad4u.github.io/eslint-plugin-tsdoc-require-2/docs/rules";

const presetDefinitions = [
    {
        configKey: "tsdocRequire.configs.recommended",
        description: "Minimal baseline TSDoc enforcement.",
        emoji: "🟢",
        name: "recommended",
        rules: ["require"],
        slug: "recommended",
    },
    {
        configKey: "tsdocRequire.configs.detailed",
        description: "Require comments plus @remarks.",
        emoji: "🟡",
        name: "detailed",
        rules: ["require", "require-remarks"],
        slug: "detailed",
    },
    {
        configKey: "tsdocRequire.configs.packages",
        description: "Package docs baseline with @packageDocumentation.",
        emoji: "🟠",
        name: "packages",
        rules: [
            "require",
            "require-remarks",
            "require-package-documentation",
        ],
        slug: "packages",
    },
    {
        configKey: "tsdocRequire.configs.typedoc",
        description: "Conservative TypeDoc declaration-kind tags.",
        emoji: "🔵",
        name: "typedoc",
        rules: [
            "require",
            "require-class",
            "require-enum",
            "require-function",
            "require-interface",
        ],
        slug: "typedoc",
    },
    {
        configKey: 'tsdocRequire.configs["typedoc-strict"]',
        description: "Strict TypeDoc with module/remarks and tag restrictions.",
        emoji: "🔴",
        name: "typedoc-strict",
        rules: [
            "require",
            "require-class",
            "require-enum",
            "require-function",
            "require-interface",
            "require-module",
            "require-remarks",
            "restrict-tags",
        ],
        slug: "typedoc-strict",
    },
    {
        configKey: "tsdocRequire.configs.tsdoc",
        description:
            "TSDoc-focused baseline with function/type tags plus tag restrictions.",
        emoji: "🟣",
        name: "tsdoc",
        rules: [
            "require",
            "require-param",
            "require-remarks",
            "require-returns",
            "require-throws",
            "require-type-param",
            "restrict-tags",
        ],
        slug: "tsdoc",
    },
    {
        configKey: "tsdocRequire.configs.jsdoc",
        description: "JSDoc-style function-tag baseline.",
        emoji: "🟦",
        name: "jsdoc",
        rules: [
            "require",
            "require-param",
            "require-returns",
            "require-throws",
        ],
        slug: "jsdoc",
    },
    {
        configKey: "tsdocRequire.configs.all",
        description:
            "All plugin rules. Use for audits and deliberate strictness.",
        emoji: "⚫",
        name: "all",
        rules: [],
        slug: "all",
    },
];

/**
 * @param {string} slug
 *
 * @returns {string}
 */
const toPresetDocPath = (slug) => `${websiteRulesBaseUrl}/presets/${slug}`;

/**
 * @param {string} ruleName
 *
 * @returns {string}
 */
const toRuleDocPath = (ruleName) => {
    if (ruleName === "require") {
        return `${websiteRulesBaseUrl}/require`;
    }

    if (ruleName === "restrict-tags") {
        return `${websiteRulesBaseUrl}/restrict-tags`;
    }

    return `${websiteRulesBaseUrl}/required-tags/${ruleName}`;
};

/**
 * @param {string} ruleName
 *
 * @returns {string}
 */
const toRuleLink = (ruleName) =>
    `[` + `\`tsdoc-require-2/${ruleName}\`` + `](${toRuleDocPath(ruleName)})`;

/**
 * @param {string} _ruleName
 *
 * @returns {"—"}
 */
const toFixLegendValue = (_ruleName) => "—";

/**
 * @param {readonly string[]} requiredTagRuleNames
 *
 * @returns {{
 *     allRuleNames: readonly string[];
 *     presetMembership: Readonly<Record<string, ReadonlySet<string>>>;
 * }}
 */
const buildPresetMembership = (requiredTagRuleNames) => {
    const allRuleNames = [
        "require",
        "restrict-tags",
        ...requiredTagRuleNames,
    ].toSorted((left, right) => left.localeCompare(right));

    /** @type {Record<string, ReadonlySet<string>>} */
    const presetMembership = {};

    for (const preset of presetDefinitions) {
        if (preset.name === "all") {
            presetMembership[preset.name] = new Set(allRuleNames);
            continue;
        }

        presetMembership[preset.name] = new Set(preset.rules);
    }

    return {
        allRuleNames,
        presetMembership,
    };
};

/**
 * @returns {string[]}
 */
const buildPresetLegendLines = () => [
    "- `Fix` legend:",
    "  - `🔧` = autofixable",
    "  - `💡` = suggestions available",
    "  - `—` = report only",
    "- `Preset key` legend:",
    ...presetDefinitions.map((preset) => {
        const presetPath = toPresetDocPath(preset.slug);

        return `  - [${preset.emoji}](${presetPath}) — [\`${preset.configKey}\`](${presetPath}) — ${preset.description}`;
    }),
];

/**
 * @param {readonly string[]} requiredTagRuleNames
 *
 * @returns {string}
 */
const buildPresetMatrix = (requiredTagRuleNames) => {
    const { allRuleNames, presetMembership } =
        buildPresetMembership(requiredTagRuleNames);

    const tableHeader = [
        "| Rule | Fix | Preset key |",
        "| --- | :---: | --- |",
    ];

    const tableRows = allRuleNames.map((ruleName) => {
        const presetLinks = presetDefinitions
            .filter((preset) => presetMembership[preset.name]?.has(ruleName))
            .map(
                (preset) => `[${preset.emoji}](${toPresetDocPath(preset.slug)})`
            )
            .join(" ");

        return `| ${toRuleLink(ruleName)} | ${toFixLegendValue(ruleName)} | ${presetLinks} |`;
    });

    return [
        "### Preset matrix",
        "",
        ...buildPresetLegendLines(),
        "",
        ...tableHeader,
        ...tableRows,
    ].join("\n");
};

/**
 * @param {string} text
 * @param {string} replacementBody
 * @param {string} fileLabel
 *
 * @returns {string}
 */
const replaceBetweenMarkers = (text, replacementBody, fileLabel) => {
    const beginIndex = text.indexOf(BEGIN_MARKER);
    const endIndex = text.indexOf(END_MARKER);

    if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
        throw new Error(
            `Could not find valid marker pair ${BEGIN_MARKER} / ${END_MARKER} in ${fileLabel}`
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

    const [
        readmeText,
        presetsOverviewText,
        requiredTagRulesText,
    ] = await Promise.all([
        readFile(readmePath, "utf8"),
        readFile(presetsOverviewPath, "utf8"),
        readFile(requiredTagRulesPath, "utf8"),
    ]);

    const requiredTagRuleNames =
        parseRequiredTagRuleNames(requiredTagRulesText);
    const matrix = buildPresetMatrix(requiredTagRuleNames);
    const updatedReadme = replaceBetweenMarkers(
        readmeText,
        matrix,
        "README.md"
    );
    const updatedPresetsOverview = replaceBetweenMarkers(
        presetsOverviewText,
        matrix,
        "docs/rules/presets/index.md"
    );

    const readmeChanged = updatedReadme !== readmeText;
    const presetsOverviewChanged =
        updatedPresetsOverview !== presetsOverviewText;

    if (!readmeChanged && !presetsOverviewChanged) {
        console.log(
            "README and presets overview matrices are already up-to-date."
        );
        return;
    }

    if (checkOnly) {
        if (readmeChanged) {
            console.error(
                "README presets matrix is out-of-date. Run: node ./scripts/sync-presets-rules-matrix.mjs"
            );
        }

        if (presetsOverviewChanged) {
            console.error(
                "docs/rules/presets/index.md presets matrix is out-of-date. Run: node ./scripts/sync-presets-rules-matrix.mjs"
            );
        }

        process.exitCode = 1;
        return;
    }

    await Promise.all([
        writeFile(readmePath, updatedReadme, "utf8"),
        writeFile(presetsOverviewPath, updatedPresetsOverview, "utf8"),
    ]);
    console.log("Updated README and presets overview matrices.");
};

await main();
