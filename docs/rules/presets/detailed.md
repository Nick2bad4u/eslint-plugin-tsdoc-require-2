# detailed

Adds `@remarks` requirements on top of `recommended` for richer top-level docs.

## Config key

`tsdocRequire.configs.detailed`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.detailed,
];
```

## Rules in this preset

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-remarks`](../required-tags/require-remarks.md)
