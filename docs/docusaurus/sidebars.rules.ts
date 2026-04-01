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

const toDocItem = (docId: string, className?: string) => ({
    ...(className ? { className } : {}),
    id: docId,
    type: "doc" as const,
});

const rulesSidebar: SidebarsConfig = {
    rules: [
        {
            className: "sb-cat-guides",
            collapsed: false,
            label: "Guides",
            type: "category",
            items: [
                {
                    className: "sb-doc-guide-overview",
                    href: "/docs/",
                    label: "Overview",
                    type: "link",
                },
                {
                    className: "sb-doc-guide-getting-started",
                    href: "/docs/getting-started/",
                    label: "Getting Started",
                    type: "link",
                },
                {
                    className: "sb-doc-guide-developer",
                    href: "/docs/developer/",
                    label: "Developer Guide",
                    type: "link",
                },
            ],
        },
        {
            className: "sb-cat-presets",
            collapsed: false,
            items: ["presets/index", ...presetDocIds].map((docId) =>
                toDocItem(docId, "sb-doc-preset")
            ),
            label: "Presets",
            type: "category",
        },
        toDocItem("index", "sb-doc-rule-overview"),
        toDocItem("require", "sb-doc-rule-core"),
        toDocItem("required-tags", "sb-doc-rule-family"),
        {
            className: "sb-cat-rules-required-tags",
            collapsed: true,
            items: requiredTagRuleDocIds.map((docId) =>
                toDocItem(docId, "sb-doc-required-tag")
            ),
            label: "Required Tags Rules",
            type: "category",
        },
        toDocItem("restrict-tags", "sb-doc-rule-core"),
    ],
};

export default rulesSidebar;
