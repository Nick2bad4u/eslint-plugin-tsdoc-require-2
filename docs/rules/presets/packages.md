# packages

Package-focused preset for package entrypoint and module-level narrative docs.

## What this preset is for

Use `packages` when you publish libraries/SDKs and want package-level documentation quality, not only declaration-level comments.

This preset is useful for:

- npm packages with public entrypoints
- monorepo packages with independent docs contracts
- API libraries that rely on `@packageDocumentation`

## What this preset enables

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-remarks`](../required-tags/require-remarks.md)
- [`tsdoc-require-2/require-package-documentation`](../required-tags/require-package-documentation.md)

Compared to `detailed`, this adds package-level documentation intent.

## Config key

`tsdocRequire.configs.packages`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.packages,
];
```

## Practical guidance

- Start here for library repos where docs are part of the public contract.
- Pair with [`tsdoc`](./tsdoc.md) if you also need strict function/type tag policy.
- If package-level docs are not relevant, `detailed` is usually a better baseline.
