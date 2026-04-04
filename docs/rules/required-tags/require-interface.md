# tsdoc-require-2/require-interface

Require the `@interface` tag in TSDoc blocks for supported TypeScript declarations.

## Rule details

This rule reports declarations that already have TSDoc but do not contain `@interface`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

## Why use it

`@interface` can help teams and doc generators that expect explicit declaration-kind tags.

## Options

This rule accepts the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`: limit which declaration kinds are checked.
- `exportMode`: choose whether to check exported declarations, non-exported top-level declarations, or both.
- `includeNonExported`: legacy alias for `exportMode: "all"`.

Flat config example (interface-only scope):

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    {
        plugins: {
            "tsdoc-require-2": tsdocRequire,
        },
        rules: {
            "tsdoc-require-2/require-interface": [
                "error",
                { enforceFor: ["interface"] },
            ],
        },
    },
];
```

## ❌ Incorrect

```ts
/**
 * Contract used by the cache layer.
 */
export interface CacheStore {
    get(key: string): string | undefined;
}
```

## ✅ Correct

```ts
/**
 * Contract used by the cache layer.
 * @interface
 */
export interface CacheStore {
    get(key: string): string | undefined;
}
```

## When not to use it

Disable this rule if your documentation convention does not require `@interface` on the declarations targeted by your configuration.

## Further reading

- [TSDoc](https://tsdoc.org)
- [TypeDoc Tags](https://typedoc.org/documents/Tags.html)
- [required-tags](../required-tags.md)
