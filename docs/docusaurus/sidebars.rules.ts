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

const toDocItem = (docId: string) => ({
    id: docId,
    type: "doc" as const,
});

const rulesSidebar: SidebarsConfig = {
    rules: [
        toDocItem("index"),
        toDocItem("require"),
        toDocItem("required-tags"),
        {
            className: "sb-cat-rules-required-tags",
            collapsed: true,
            items: requiredTagRuleDocIds.map(toDocItem),
            label: "required-tags rules",
            type: "category",
        },
        toDocItem("restrict-tags"),
        {
            className: "sb-cat-presets",
            collapsed: true,
            items: ["presets/index", ...presetDocIds].map(toDocItem),
            label: "presets",
            type: "category",
        },
    ],
};

export default rulesSidebar;
