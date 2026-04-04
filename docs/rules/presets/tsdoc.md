# tsdoc

TSDoc-focused preset with function/type-parameter requirements and compatibility-tag restrictions.

## What this preset is for

Use `tsdoc` when you want a strong TSDoc baseline with both required content and vocabulary controls.

This preset works well for:

- TypeScript library APIs
- SDKs with strict documentation standards
- teams standardizing on TSDoc over mixed JSDoc/TypeDoc conventions

## What this preset enables

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-remarks`](../required-tags/require-remarks.md)
- [`tsdoc-require-2/require-param`](../required-tags/require-param.md) with `enforceFor: ["function"]`
- [`tsdoc-require-2/require-returns`](../required-tags/require-returns.md) with `enforceFor: ["function"]`
- [`tsdoc-require-2/require-throws`](../required-tags/require-throws.md) with `enforceFor: ["function"]`
- [`tsdoc-require-2/require-type-param`](../required-tags/require-type-param.md) with `enforceFor: ["class", "function", "interface", "type"]`
- [`tsdoc-require-2/restrict-tags`](../restrict-tags.md) in deny mode for TypeDoc compatibility tags

## Why this preset is different from `jsdoc`

`jsdoc` focuses on function tags only. `tsdoc` adds stronger TSDoc structure (`@remarks`, `@typeParam`) and stricter tag vocabulary.

## Config key

`tsdocRequire.configs.tsdoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.tsdoc,
];
```

## Common customization

If your docs intentionally use some TypeDoc tags, override `restrict-tags.tags` instead of disabling `restrict-tags` entirely.
