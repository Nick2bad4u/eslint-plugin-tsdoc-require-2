import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

import { readdirSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectoryPath = path.dirname(fileURLToPath(import.meta.url));
const rulesDocsDirectoryPath = path.resolve(currentDirectoryPath, "../rules");

const toDocId = (folderName: string, fileName: string): string =>
    `${folderName}/${fileName.replace(/\.md$/v, "")}`;

const readDocIdsFromDirectory = (folderName: string): readonly string[] => {
    const targetDirectoryPath = path.resolve(
        rulesDocsDirectoryPath,
        folderName
    );

    return readdirSync(targetDirectoryPath, { withFileTypes: true })
        .filter((directoryEntry) => directoryEntry.isFile())
        .map((directoryEntry) => directoryEntry.name)
        .filter(
            (fileName) => fileName.endsWith(".md") && fileName !== "index.md"
        )
        .toSorted((leftFileName, rightFileName) =>
            leftFileName.localeCompare(rightFileName)
        )
        .map((fileName) => toDocId(folderName, fileName));
};

const requiredTagRuleDocIds = readDocIdsFromDirectory("required-tags");
const presetDocIds = readDocIdsFromDirectory("presets");

const requiredTagItemIcons = [
    "🔵",
    "🟠",
    "🟡",
    "🟢",
    "🟣",
    "🟤",
] as const;

const toTitleCaseWords = (value: string): string =>
    value
        .split("-")
        .filter((segment) => segment.length > 0)
        .map(
            (segment) =>
                `${segment.at(0)?.toUpperCase() ?? ""}${segment.slice(1)}`
        )
        .join(" ");

const toRequiredTagLabel = (docId: string): string => {
    const ruleNameWithoutPrefix = docId
        .replace(/^required-tags\//v, "")
        .replace(/^require-/v, "");

    return `Require ${toTitleCaseWords(ruleNameWithoutPrefix)}`;
};

const toDocItem = (docId: string, className?: string, label?: string) => ({
    ...(className && { className }),
    id: docId,
    ...(label && { label }),
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
    const icon =
        requiredTagItemIcons[itemIndex % requiredTagItemIcons.length] ?? "";
    const variantClassName = `sb-required-tag-variant-${itemIndex % requiredTagItemIcons.length}`;

    return toDocItem(
        docId,
        `sb-doc-required-tag ${variantClassName}`,
        `${icon} ${toRequiredTagLabel(docId)}`
    );
};

const rulesSidebar = {
    rules: [
        {
            className: "sb-cat-guides",
            collapsed: false,
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
            label: "🧭 Guides",
            type: "category",
        },
        {
            className: "sb-cat-developer-ops",
            collapsed: true,
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
            label: "🛠️ Developer",
            type: "category",
        },
        {
            className: "sb-cat-presets",
            collapsed: false,
            items: ["presets/index", ...presetDocIds].map((docId) =>
                toPresetDocItem(docId)
            ),
            label: "🎛️ Presets",
            type: "category",
        },
        {
            className: "sb-cat-rules-overview",
            collapsed: false,
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
            label: "📜 Rules",
            link: { id: "index", type: "doc" },
            type: "category",
        },
    ],
} satisfies SidebarsConfig;

export default rulesSidebar;
