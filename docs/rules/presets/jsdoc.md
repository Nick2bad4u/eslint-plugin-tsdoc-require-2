# jsdoc

JSDoc-leaning preset focused on function documentation tags (`@param`, `@returns`, `@throws`).

## What this preset is for

Use `jsdoc` when you want a function-signature documentation baseline that feels familiar to JSDoc-heavy teams.

It is a practical option for:

- mixed JS/TS repositories
- teams migrating toward stronger docs without full TSDoc strictness
- service codebases that mainly care about function contracts

## What this preset enables

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-param`](../required-tags/require-param.md) with `enforceFor: ["function"]`
- [`tsdoc-require-2/require-returns`](../required-tags/require-returns.md) with `enforceFor: ["function"]`
- [`tsdoc-require-2/require-throws`](../required-tags/require-throws.md) with `enforceFor: ["function"]`

## Important behavior detail

This preset scopes the tag rules to functions only. It does not require `@remarks`, `@typeParam`, or tag restrictions.

## Config key

`tsdocRequire.configs.jsdoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.jsdoc,
];
```

## When to choose a different preset

- Choose [`tsdoc`](./tsdoc.md) when you need stronger TSDoc conventions and restricted tag vocabulary.
- Choose [`recommended`](./recommended.md) when function tags would create too much migration noise initially.
