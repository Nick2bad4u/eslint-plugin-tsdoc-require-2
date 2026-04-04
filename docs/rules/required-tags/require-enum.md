# tsdoc-require-2/require-enum

Require the `@enum` tag in TSDoc blocks for supported TypeScript declarations.

## Rule details

This rule reports declarations that already have TSDoc but do not contain `@enum`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

## Why use it

`@enum` can help teams and doc generators that expect explicit declaration-kind tags.

## Options

This rule accepts the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`: limit which declaration kinds are checked.
- `exportMode`: choose whether to check exported declarations, non-exported top-level declarations, or both.
- `includeNonExported`: legacy alias for `exportMode: "all"`.

Flat config example (enum-only scope):

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    {
        plugins: {
            "tsdoc-require-2": tsdocRequire,
        },
        rules: {
            "tsdoc-require-2/require-enum": ["error", { enforceFor: ["enum"] }],
        },
    },
];
```

## ❌ Incorrect

```ts
/**
 * Status values accepted by the API.
 */
export enum Status {
    Ready = "ready",
    Running = "running",
}
```

## ✅ Correct

```ts
/**
 * Status values accepted by the API.
 * @enum
 */
export enum Status {
    Ready = "ready",
    Running = "running",
}
```

## When not to use it

Disable this rule if your documentation convention does not require `@enum` on the declarations targeted by your configuration.

## Further reading

- [TSDoc](https://tsdoc.org)
- [TypeDoc Tags](https://typedoc.org/documents/Tags.html)
- [required-tags](../required-tags.md)
