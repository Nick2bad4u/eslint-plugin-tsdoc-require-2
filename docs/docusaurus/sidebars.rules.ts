import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectoryPath = dirname(fileURLToPath(import.meta.url));
const rulesDocsDirectoryPath = resolve(currentDirectoryPath, "../rules");

const toDocId = (folderName: string, fileName: string): string =>
    `${folderName}/${fileName.replace(/\.md$/u, "")}`;

const readDocIdsFromDirectory = (folderName: string): readonly string[] => {
    const targetDirectoryPath = resolve(rulesDocsDirectoryPath, folderName);

    return readdirSync(targetDirectoryPath, { withFileTypes: true })
        .filter((directoryEntry) => directoryEntry.isFile())
        .map((directoryEntry) => directoryEntry.name)
        .filter(
            (fileName) => fileName.endsWith(".md") && fileName !== "index.md"
        )
        .sort((leftFileName, rightFileName) =>
            leftFileName.localeCompare(rightFileName)
        )
        .map((fileName) => toDocId(folderName, fileName));
};

const requiredTagRuleDocIds = readDocIdsFromDirectory("required-tags");
const presetDocIds = readDocIdsFromDirectory("presets");

const requiredTagItemIcons = [
    "🟢",
    "🟡",
    "🟠",
    "🟣",
    "🔵",
    "🟤",
] as const;

const toTitleCaseWords = (value: string): string =>
    value
        .split("-")
        .filter((segment) => segment.length > 0)
        .map(
            (segment) => `${segment[0]?.toUpperCase() ?? ""}${segment.slice(1)}`
        )
        .join(" ");

const toRequiredTagLabel = (docId: string): string => {
    const ruleNameWithoutPrefix = docId
        .replace(/^required-tags\//u, "")
        .replace(/^require-/u, "");

    return `Require ${toTitleCaseWords(ruleNameWithoutPrefix)}`;
};

const toDocItem = (docId: string, className?: string, label?: string) => ({
    ...(className ? { className } : {}),
    id: docId,
    ...(label ? { label } : {}),
    type: "doc" as const,
});

const presetDisplayConfig: Readonly<
    Record<
        string,
        {
            className: string;
            label: string;
        }
    >
> = {
    "presets/all": {
        className: "sb-doc-preset sb-preset-all",
        label: "🟥 All",
    },
    "presets/detailed": {
        className: "sb-doc-preset sb-preset-recommended-type-checked",
        label: "⬜ Detailed",
    },
    "presets/index": {
        className: "sb-doc-preset sb-preset-minimal",
        label: "📘 Presets Overview",
    },
    "presets/jsdoc": {
        className: "sb-doc-preset sb-preset-experimental",
        label: "🟧 JSDoc",
    },
    "presets/packages": {
        className: "sb-doc-preset sb-preset-strict",
        label: "🟪 Packages",
    },
    "presets/recommended": {
        className: "sb-doc-preset sb-preset-recommended",
        label: "🟨 Recommended",
    },
    "presets/tsdoc": {
        className: "sb-doc-preset sb-preset-tsdoc",
        label: "🟩 TSDoc",
    },
    "presets/typedoc": {
        className: "sb-doc-preset sb-preset-typedoc",
        label: "🟦 TypeDoc",
    },
    "presets/typedoc-strict": {
        className: "sb-doc-preset sb-preset-typedoc",
        label: "🟫 TypeDoc Strict",
    },
};

const toPresetDocItem = (docId: string) => {
    const presetConfig = presetDisplayConfig[docId];
    if (presetConfig === undefined) {
        return toDocItem(docId, "sb-doc-preset");
    }

    return toDocItem(docId, presetConfig.className, presetConfig.label);
};

const toRequiredTagDocItem = (docId: string, itemIndex: number) => {
    const icon = requiredTagItemIcons[itemIndex % requiredTagItemIcons.length];
    const variantClassName = `sb-required-tag-variant-${itemIndex % requiredTagItemIcons.length}`;

    return toDocItem(
        docId,
        `sb-doc-required-tag ${variantClassName}`,
        `${icon} ${toRequiredTagLabel(docId)}`
    );
};

const rulesSidebar: SidebarsConfig = {
    rules: [
        {
            className: "sb-cat-guides",
            collapsed: false,
            label: "🧭 Guides",
            type: "category",
            items: [
                toDocItem(
                    "index",
                    "sb-doc-overview sb-doc-guide-overview",
                    "🏁 Overview"
                ),
                toDocItem(
                    "getting-started",
                    "sb-doc-getting-started sb-doc-guide-getting-started",
                    "🚀 Getting Started"
                ),
            ],
        },
        {
            className: "sb-cat-developer-ops",
            collapsed: true,
            label: "🛠️ Developer",
            type: "category",
            items: [
                {
                    className: "sb-doc-site-contract",
                    href: "/docs/developer/",
                    label: "📚 Developer Guide",
                    type: "link",
                },
                {
                    className: "sb-doc-site-contract",
                    href: "/docs/developer/docusaurus-site-contract/",
                    label: "🧭 Docusaurus Site Contract",
                    type: "link",
                },
            ],
        },
        {
            className: "sb-cat-presets",
            collapsed: false,
            items: ["presets/index", ...presetDocIds].map(toPresetDocItem),
            label: "🎛️ Presets",
            type: "category",
        },
        {
            className: "sb-cat-rules-overview",
            collapsed: false,
            label: "📜 Rules",
            type: "category",
            link: { type: "doc", id: "index" },
            items: [
                toDocItem("require", "sb-doc-rule-core", "🧰 require"),
                toDocItem(
                    "required-tags",
                    "sb-doc-rule-family",
                    "🏷️ required-tags"
                ),
                {
                    className: "sb-cat-rules-required-tags",
                    collapsed: true,
                    items: requiredTagRuleDocIds.map((docId, itemIndex) =>
                        toRequiredTagDocItem(docId, itemIndex)
                    ),
                    label: "✨ Required Tags Rules",
                    type: "category",
                },
                toDocItem(
                    "restrict-tags",
                    "sb-doc-rule-core",
                    "🚫 restrict-tags"
                ),
            ],
        },
    ],
};

export default rulesSidebar;
