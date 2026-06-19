import nickTwoBadFourU from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

/**
 * Check whether an unknown value is a plain object-like record.
 *
 * @param {unknown} value - Value to inspect.
 *
 * @returns {value is Record<string, unknown>} True when `value` is object-like.
 */
const isRecord = (value) => value !== null && typeof value === "object";

/** @type {Record<string, unknown>} */
const pluginAllRules = (() => {
    if (!isRecord(plugin.configs)) {
        return {};
    }

    const allConfig = plugin.configs["all"];
    if (!isRecord(allConfig) || !isRecord(allConfig["rules"])) {
        return {};
    }

    return allConfig["rules"];
})();

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.withoutTsdocRequire2,

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local TSDoc Require",
        plugins: {
            "tsdoc-require-2": plugin,
        },
        rules: {
            ...pluginAllRules,

            "tsdoc-require-2/require": "warn",
            "tsdoc-require-2/require-abstract": "off",
            "tsdoc-require-2/require-alpha": "off",
            "tsdoc-require-2/require-author": "off",
            "tsdoc-require-2/require-beta": "off",
            "tsdoc-require-2/require-category": "off",
            "tsdoc-require-2/require-class": "off",
            "tsdoc-require-2/require-decorator": "off",
            "tsdoc-require-2/require-default-value": "off",
            "tsdoc-require-2/require-deprecated": "off",
            "tsdoc-require-2/require-document": "off",
            "tsdoc-require-2/require-enum": "off",
            "tsdoc-require-2/require-event": "off",
            "tsdoc-require-2/require-event-property": "off",
            "tsdoc-require-2/require-example": "off",
            "tsdoc-require-2/require-expand": "off",
            "tsdoc-require-2/require-experimental": "off",
            "tsdoc-require-2/require-function": "off",
            "tsdoc-require-2/require-group": "off",
            "tsdoc-require-2/require-hidden": "off",
            "tsdoc-require-2/require-hideconstructor": "off",
            "tsdoc-require-2/require-ignore": "off",
            "tsdoc-require-2/require-import": "off",
            "tsdoc-require-2/require-include": "off",
            "tsdoc-require-2/require-inherit-doc": "off",
            "tsdoc-require-2/require-inline": "off",
            "tsdoc-require-2/require-interface": "off",
            "tsdoc-require-2/require-internal": "off",
            "tsdoc-require-2/require-label": "off",
            "tsdoc-require-2/require-license": "off",
            "tsdoc-require-2/require-link": "off",
            "tsdoc-require-2/require-merge-module-with": "off",
            "tsdoc-require-2/require-module": "off",
            "tsdoc-require-2/require-namespace": "off",
            "tsdoc-require-2/require-overload": "off",
            "tsdoc-require-2/require-override": "off",
            "tsdoc-require-2/require-package-documentation": "off",
            "tsdoc-require-2/require-param": "off",
            "tsdoc-require-2/require-primary-export": "off",
            "tsdoc-require-2/require-private": "off",
            "tsdoc-require-2/require-private-remarks": "off",
            "tsdoc-require-2/require-property": "off",
            "tsdoc-require-2/require-protected": "off",
            "tsdoc-require-2/require-public": "off",
            "tsdoc-require-2/require-readonly": "off",
            "tsdoc-require-2/require-remarks": "off",
            "tsdoc-require-2/require-returns": "off",
            "tsdoc-require-2/require-sealed": "off",
            "tsdoc-require-2/require-see": "off",
            "tsdoc-require-2/require-since": "off",
            "tsdoc-require-2/require-sort-strategy": "off",
            "tsdoc-require-2/require-summary": "off",
            "tsdoc-require-2/require-template": "off",
            "tsdoc-require-2/require-throws": "off",
            "tsdoc-require-2/require-type-param": "off",
            "tsdoc-require-2/require-use-declared-type": "off",
            "tsdoc-require-2/require-virtual": "off",
            "tsdoc-require-2/restrict-tags": "off",
        },
    },
    {
        ignores: [
            "knip.config.ts",
            "plugin.d.mts",
            "temp/**",
            "types/**/*.d.ts",
            "vitest.stryker.config.ts",
            "docs/docusaurus/typedoc-plugins/*.{mjs,mts}",
        ],
        name: "Generated and external tooling shims",
    },
    {
        files: [".ncurc.json", "docs/docusaurus/static/manifest.json"],
        name: "Non-default JSON schemas",
        rules: {
            "json-schema-validator-2/no-invalid": "off",
        },
    },
    {
        files: ["docs/docusaurus/docusaurus.config.ts"],
        name: "Docusaurus runtime config",
        rules: {
            "n/no-process-env": "off",
            "unicorn/no-non-function-verb-prefix": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/prefer-short-arrow-method": "off",
            "unicorn/prefer-temporal": "off",
        },
    },
    {
        files: ["docs/docusaurus/sidebars.rules.ts"],
        name: "Docusaurus sidebar generation",
        rules: {
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "n/no-sync": "off",
            "unicorn/prefer-import-meta-properties": "off",
        },
    },
    {
        files: ["docs/docusaurus/src/**/*.css"],
        name: "Docusaurus CSS uses direct Stylelint gate",
        rules: {
            "stylelint-2/stylelint": "off",
        },
    },
    {
        files: [
            "docs/docusaurus/src/components/GitHubStats.tsx",
            "docs/docusaurus/src/js/modernEnhancements.ts",
            "docs/docusaurus/src/pages/index.tsx",
        ],
        name: "Docusaurus client surface conventions",
        rules: {
            "canonical/filename-no-index": "off",
            "runtime-cleanup/no-unmanaged-event-listeners": "off",
            "unicorn/filename-case": "off",
        },
    },
    {
        files: ["docs/docusaurus/src/js/modernEnhancements.ts"],
        name: "Browser enhancement script",
        rules: {
            "@typescript-eslint/no-dynamic-delete": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-global-object-property-assignment": "off",
            "unicorn/no-immediate-mutation": "off",
            "unicorn/no-unnecessary-global-this": "off",
            "unicorn/prefer-single-call": "off",
        },
    },
    {
        files: ["src/rules/require-tag-rules.ts"],
        name: "Generated required tag rule registry",
        rules: {
            "import-x/max-dependencies": "off",
        },
    },
    {
        files: ["stryker.config.mjs"],
        name: "Stryker JavaScript config",
        rules: {
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
        },
    },
];

export default config;
