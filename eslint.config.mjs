import nick2bad4u from "eslint-config-nick2bad4u";

import tsdocRequire from "./plugin.mjs";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nick2bad4u.configs.withoutTsdocRequire2,

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local TSDoc Require",
        plugins: {
            "tsdoc-require-2": tsdocRequire,
        },
        rules: {
            // @ts-expect-error -- plugin.mjs is typed as generic ESLint.Plugin.
            ...tsdocRequire.configs.all.rules,

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
    // Add repository-specific config entries below as needed.
];

export default config;
