# tsdoc

TSDoc-focused preset with function/type-parameter requirements and compatibility-tag restrictions.

## Config key

`tsdocRequire.configs.tsdoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.tsdoc,
];
```

## Rules in this preset

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-param`](../required-tags/require-param.md)
- [`tsdoc-require-2/require-remarks`](../required-tags/require-remarks.md)
- [`tsdoc-require-2/require-returns`](../required-tags/require-returns.md)
- [`tsdoc-require-2/require-throws`](../required-tags/require-throws.md)
- [`tsdoc-require-2/require-type-param`](../required-tags/require-type-param.md)
- [`tsdoc-require-2/restrict-tags`](../restrict-tags.md)
