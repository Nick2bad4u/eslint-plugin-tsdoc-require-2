/**
 * @packageDocumentation
 * Repository-local Docusaurus site blueprint for eslint-plugin-tsdoc-require-2.
 */

import { defineDocusaurusSiteContract } from "../../packages/docusaurus-site-contract/index.mjs";

const presetPageSlugs = [
    "all",
    "detailed",
    "jsdoc",
    "packages",
    "recommended",
    "tsdoc",
    "typedoc",
    "typedoc-strict",
];

const sharedPresetPageSnippets = [
    "## Config key",
    "## Flat Config example",
    "## Rules in this preset",
];

const siteContract = defineDocusaurusSiteContract({
    docusaurusConfig: {
        footer: {
            maxItemCountDelta: 2,
            minColumns: 3,
            requiredLinkLabelPatterns: [
                /Overview/v,
                /Getting Started/v,
                /ESLint Inspector/v,
            ],
            requiredTitles: [
                /Explore/v,
                /Project/v,
                /Support/v,
            ],
            requireLogo: true,
        },
        navbar: {
            orderedItems: [
                {
                    labelPattern: /Docs/v,
                    minDropdownItems: 2,
                    position: "left",
                    toPattern: /^\/docs\/rules\/?$/v,
                    type: "dropdown",
                },
                {
                    labelPattern: /Rules/v,
                    minDropdownItems: 2,
                    position: "left",
                    toPattern: /^\/docs\/rules\/?$/v,
                    type: "dropdown",
                },
                {
                    labelPattern: /Presets/v,
                    minDropdownItems: 5,
                    position: "left",
                    toPattern: /^\/docs\/rules\/presets\/?$/v,
                    type: "dropdown",
                },
                {
                    hrefPattern: /^https:\/\/github\.com\//v,
                    labelPattern: /GitHub/v,
                    minDropdownItems: 2,
                    position: "right",
                    type: "dropdown",
                },
                {
                    labelPattern: /Dev/v,
                    minDropdownItems: 3,
                    position: "right",
                    toPattern: /^\/docs\/developer\/?$/v,
                    type: "dropdown",
                },
            ],
            requireLogo: true,
        },
        path: "docs/docusaurus/docusaurus.config.ts",
        requiredClientModuleIdentifiers: ["modernEnhancementsClientModule"],
        requiredPluginNames: [
            "docusaurus-plugin-image-zoom",
            "@docusaurus/plugin-pwa",
            "@docusaurus/plugin-content-docs",
        ],
        requiredThemeNames: [
            "@docusaurus/theme-mermaid",
            "@easyops-cn/docusaurus-search-local",
        ],
        requiredTopLevelProperties: [
            "baseUrl",
            "clientModules",
            "favicon",
            "plugins",
            "presets",
            "projectName",
            "themeConfig",
            "themes",
            "title",
            "url",
        ],
        requireFavicon: true,
        requireThemeImage: true,
        searchPlugin: {
            packageName: "@easyops-cn/docusaurus-search-local",
            requiredOptions: {
                indexBlog: true,
                indexDocs: true,
                searchBarPosition: "left",
                searchBarShortcut: true,
            },
        },
    },
    manifestFiles: [
        {
            minimumIcons: 2,
            path: "docs/docusaurus/static/manifest.json",
            requiredFields: {
                name: "eslint-plugin-tsdoc-require-2 Documentation",
                short_name: "TSDoc Docs",
            },
            requireExistingIconFiles: true,
        },
    ],
    packageJsonFiles: [
        {
            path: "package.json",
            requiredScripts: [
                {
                    includes:
                        "node packages/docusaurus-site-contract/cli.mjs --config docs/docusaurus/site-contract.config.mjs",
                    name: "docs:check-site-contract",
                },
                {
                    includes:
                        "node packages/docusaurus-site-contract/cli.mjs init --root .",
                    name: "docs:site-contract:init",
                },
                {
                    includes: "docs/docusaurus/static/eslint-inspector",
                    name: "build:eslint-inspector",
                },
                {
                    includes: "docs/docusaurus/static/eslint-inspector",
                    name: "build:eslint-inspector:local",
                },
            ],
        },
        {
            path: "docs/docusaurus/package.json",
            requiredScripts: [
                {
                    includes: "npm --prefix ../.. run docs:check-site-contract",
                    name: "build",
                },
                {
                    includes: "npm --prefix ../.. run docs:check-site-contract",
                    name: "build:fast",
                },
                {
                    includes: "npm --prefix ../.. run docs:check-site-contract",
                    name: "build:local",
                },
                {
                    includes: "build:eslint-inspector",
                    name: "build",
                },
                {
                    includes: "build:eslint-inspector:local",
                    name: "build:local",
                },
            ],
        },
    ],
    requiredFiles: [
        "docs/docusaurus/docusaurus.config.ts",
        "docs/docusaurus/sidebars.rules.ts",
        "docs/docusaurus/sidebars.ts",
        "docs/docusaurus/site-docs/developer/docusaurus-site-contract.md",
        "docs/docusaurus/src/components/GitHubStats.tsx",
        "docs/docusaurus/src/css/custom.css",
        "docs/docusaurus/src/js/modernEnhancements.ts",
        "docs/docusaurus/src/pages/index.module.css",
        "docs/docusaurus/src/pages/index.tsx",
        "docs/docusaurus/static/img/favicon.ico",
        "docs/docusaurus/static/img/logo.png",
        "docs/docusaurus/static/img/logo.svg",
        "docs/docusaurus/static/img/logo_192x192.png",
        "docs/docusaurus/static/manifest.json",
        "docs/rules/presets/all.md",
        "docs/rules/presets/detailed.md",
        "docs/rules/presets/index.md",
        "docs/rules/presets/jsdoc.md",
        "docs/rules/presets/packages.md",
        "docs/rules/presets/recommended.md",
        "docs/rules/presets/tsdoc.md",
        "docs/rules/presets/typedoc.md",
        "docs/rules/presets/typedoc-strict.md",
    ],
    sourceFiles: [
        {
            path: "docs/docusaurus/docusaurus.config.ts",
            requiredPatterns: [
                {
                    description: "projectName points at this plugin repo",
                    pattern:
                        /const projectName = "eslint-plugin-tsdoc-require-2";/v,
                },
                {
                    description:
                        "default baseUrl matches this plugin pages path",
                    pattern:
                        /const baseUrl =\s*process\.env\["DOCUSAURUS_BASE_URL"\] \?\? "\/eslint-plugin-tsdoc-require-2\/";/v,
                },
            ],
            requiredSnippets: [
                'searchBarPosition: "left"',
                'routeBasePath: "docs/rules"',
            ],
        },
        {
            path: "docs/docusaurus/src/pages/index.tsx",
            requiredSnippets: [
                "const heroBadges =",
                "const heroStats =",
                "const homeCards =",
                "Start with Overview",
                "Compare Presets",
            ],
        },
        {
            path: "docs/docusaurus/src/css/custom.css",
            requiredSnippets: [
                "--ifm-color-primary",
                "--sb-accent-overview",
                ".sb-doc-site-contract > .menu__link",
                ".sb-cat-presets",
            ],
        },
        {
            path: "docs/rules/presets/index.md",
            requiredSnippets: [
                "## Preset catalog",
                "tsdocRequire.configs",
                "typedoc-strict",
            ],
        },
        ...presetPageSlugs.map((presetPageSlug) => ({
            path: `docs/rules/presets/${presetPageSlug}.md`,
            requiredSnippets: sharedPresetPageSnippets,
        })),
    ],
});

export { siteContract };
export default siteContract;
