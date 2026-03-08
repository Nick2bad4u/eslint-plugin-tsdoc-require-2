# eslint-plugin-tsdoc-require-2

[![CI](https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/actions/workflows/ci.yml)
[![Release](https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/actions/workflows/release.yml/badge.svg)](https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/actions/workflows/release.yml)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-tsdoc-require-2)](https://www.npmjs.com/package/eslint-plugin-tsdoc-require-2)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-tsdoc-require-2)](https://www.npmjs.com/package/eslint-plugin-tsdoc-require-2)

Require TSDoc comments for exported TypeScript declarations.

## Installation

```sh
npm install --save-dev eslint eslint-plugin-tsdoc-require-2 @typescript-eslint/parser typescript
```

## Usage (Flat Config)

```js
// eslint.config.mjs
import tsParser from "@typescript-eslint/parser";
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "tsdoc-require-2": tsdocRequire,
        },
        rules: {
            "tsdoc-require-2/require": "error",
        },
    },
];
```

You can also use the bundled recommended config:

```js
// eslint.config.mjs
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [tsdocRequire.configs.recommended];
```

## Options (`tsdoc-require-2/require`)

This rule accepts one optional settings object:

```ts
type Options = [
    {
        enforceFor?: Array<
            "class" |
            "enum" |
            "function" |
            "interface" |
            "object" |
            "type" |
            "variable"
        >;
    },
];
```

Default:

```ts
[{ enforceFor: ["class", "enum", "function", "interface", "object", "type", "variable"] }]
```

Example: only require TSDoc on exported classes and functions.

```js
// eslint.config.mjs
import tsParser from "@typescript-eslint/parser";
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "tsdoc-require-2": tsdocRequire,
        },
        rules: {
            "tsdoc-require-2/require": [
                "error",
                {
                    enforceFor: ["class", "function"],
                },
            ],
        },
    },
];
```

## Rule

- [`tsdoc-require-2/require`](docs/rules/require.md): Requires TSDoc comments for exported TypeScript declarations and default exports.
