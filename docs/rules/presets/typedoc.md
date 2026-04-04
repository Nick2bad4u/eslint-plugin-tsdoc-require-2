# typedoc

Conservative TypeDoc-oriented preset with declaration-kind tags that are safe to infer.

## What this preset is for

Use `typedoc` when your documentation pipeline expects explicit TypeDoc-style declaration tags.

This preset is useful for codebases that:

- generate docs with TypeDoc
- want explicit declaration classification tags
- are not ready for broader strictness from `typedoc-strict`

## What this preset enables

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-class`](../required-tags/require-class.md) with `enforceFor: ["class"]`
- [`tsdoc-require-2/require-enum`](../required-tags/require-enum.md) with `enforceFor: ["enum"]`
- [`tsdoc-require-2/require-function`](../required-tags/require-function.md) with `enforceFor: ["function"]`
- [`tsdoc-require-2/require-interface`](../required-tags/require-interface.md) with `enforceFor: ["interface"]`

## Trade-offs

- Focused on declaration-kind tags, not broader narrative or function-signature tag coverage.
- Does not include `restrict-tags`; add it manually if tag vocabulary control matters.

## Config key

`tsdocRequire.configs.typedoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.typedoc,
];
```

## Next step

Move to [`typedoc-strict`](./typedoc-strict.md) for module-level remarks and tag restrictions.
