# eslint-plugin-tsdoc-require-2

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

## Rule

- [`tsdoc-require-2/require`](docs/rules/require.md): Requires TSDoc comments for exported TypeScript declarations and default exports.
