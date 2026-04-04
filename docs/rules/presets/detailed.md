# detailed

Adds `@remarks` requirements on top of `recommended` for richer top-level docs.

## What this preset is for

Use `detailed` when comment presence alone is not enough and each declaration needs brief narrative context.

`@remarks` is useful for:

- behavior caveats
- compatibility notes
- rollout/deprecation guidance

## What this preset enables

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-remarks`](../required-tags/require-remarks.md)

Compared to `recommended`, this adds structural pressure for richer docs without introducing broad tag policy yet.

## Config key

`tsdocRequire.configs.detailed`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.detailed,
];
```

## Trade-offs

- More authoring effort than `recommended`.
- Better long-term clarity for teams maintaining shared APIs.

If you need function-signature tags (`@param`, `@returns`, `@throws`) next, move to [`jsdoc`](./jsdoc.md) or [`tsdoc`](./tsdoc.md).
