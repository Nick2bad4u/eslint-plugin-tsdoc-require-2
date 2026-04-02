# jsdoc

JSDoc-leaning preset focused on function documentation tags (`@param`, `@returns`, `@throws`).

## Config key

`tsdocRequire.configs.jsdoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.jsdoc,
];
```

## Rules in this preset

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-param`](../required-tags/require-param.md)
- [`tsdoc-require-2/require-returns`](../required-tags/require-returns.md)
- [`tsdoc-require-2/require-throws`](../required-tags/require-throws.md)
