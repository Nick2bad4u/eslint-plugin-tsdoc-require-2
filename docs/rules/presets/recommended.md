# recommended

Baseline preset that enforces TSDoc comment presence with `tsdoc-require-2/require`.

## What this preset is for

Use `recommended` when you need a low-friction starting point:

- enforce that API declarations are documented
- avoid immediate tag-level migration work
- establish a consistent baseline before adopting stricter tag policy

## What this preset enables

- [`tsdoc-require-2/require`](../require.md)

This preset only checks that comments exist. It does **not** require tags like `@param` or `@returns`, and it does not restrict tag vocabulary.

## Config key

`tsdocRequire.configs.recommended`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.recommended,
];
```

## When to choose a stricter preset

- Move to [`detailed`](./detailed.md) when every doc block should include `@remarks`.
- Move to [`jsdoc`](./jsdoc.md) or [`tsdoc`](./tsdoc.md) when function/tag contracts matter.
- Move to [`packages`](./packages.md) for package-level API docs.
