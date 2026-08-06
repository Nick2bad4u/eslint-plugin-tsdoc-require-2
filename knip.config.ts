/**
 * Repository-specific configuration for Knip dependency analysis.
 *
 * @packageDocumentation
 */
import type { KnipConfig } from "knip";

/**
 * Knip configuration that scopes entry points and dependency heuristics to the
 * repository layout.
 */
const knipConfig: KnipConfig = {
    $schema: "https://unpkg.com/knip@6/schema.json",
    ignoreFiles: [
        ".secretlintrc.cjs",
        "plugin.d.mts",
        "scripts/**/*.d.mts",
        "vitest.stryker.config.ts",
    ],
    ignoreBinaries: [
        "actionlint",
        "gitleaks",
        "grype",
        "lychee",
    ],
    ignoreDependencies: [
        ".*prettier.*",
        "@easyops-cn/docusaurus-search-local",
        "@easyops-cn/docusaurus-theme-docusaurus-search-local",
        "@eslint.*",
        "@microsoft/tsdoc-config",
        "@types.*",
        "eslint.*",
        "postcss.*",
        "remark.*",
        "stylelint.*",
        "ts.*",
        "type.*",

        // Items flagged by knip report (ignored to suppress false-positives / repo-local tools)
        "react-github-btn",
        "actionlint",
        "git-cliff",
        "gitcliff-config-nick2bad4u",
        "gitleaks-config-nick2bad4u",
        "gitleaks-secret-scanner",
        "htmlhint",
        "jscpd-config-nick2bad4u",
        "leasot",
        "lychee-config-nick2bad4u",
        "markdown-link-check",
        "ncu-config-nick2bad4u",
        "secretlint-config-nick2bad4u",
        "sloc",
        "storybook",
        "yamllint-config-nick2bad4u",
        "react",
    ],
    ignoreExportsUsedInFile: {
        interface: true,
        type: true,
    },
    rules: {
        binaries: "error",
        catalog: "error",
        dependencies: "error",
        devDependencies: "error",
        duplicates: "error",
        enumMembers: "warn",
        exports: "warn",
        files: "error",
        namespaceMembers: "warn",
        nsExports: "warn",
        nsTypes: "warn",
        optionalPeerDependencies: "error",
        types: "warn",
        unlisted: "error",
        unresolved: "error",
    },
    workspaces: {
        ".": {
            entry: ["scripts/indexnow.mjs", "src/plugin.ts"],
        },
        "docs/docusaurus": {
            ignoreIssues: {
                "src/components/GitHubStats.module.css.d.ts": ["exports"],
            },
        },
    },
};

export default knipConfig;
