# eslint-plugin-tsdoc-require

Require TSDoc comments for exported TypeScript declarations.

## Installation

```sh
npm install --save-dev eslint eslint-plugin-tsdoc-require @typescript-eslint/parser typescript
```

## Usage (Flat Config)

```js
// eslint.config.mjs
import tsParser from "@typescript-eslint/parser";
import tsdocRequire from "eslint-plugin-tsdoc-require";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "tsdoc-require": tsdocRequire,
        },
        rules: {
            "tsdoc-require/require": "error",
        },
    },
];
```

You can also use the bundled recommended config:

```js
// eslint.config.mjs
import tsdocRequire from "eslint-plugin-tsdoc-require";

export default [tsdocRequire.configs.recommended];
```

## Rule

- [`tsdoc-require/require`](docs/rules/require.md): Requires TSDoc comments for exported TypeScript declarations and default exports.
