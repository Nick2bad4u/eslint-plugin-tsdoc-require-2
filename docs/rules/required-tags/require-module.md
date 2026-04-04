# tsdoc-require-2/require-module

Require the `@module` tag in TSDoc blocks for supported TypeScript declarations.

## Rule details

This rule reports declarations that already have TSDoc but do not contain `@module`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

For module-focused behavior, use `enforceFor: ["namespace"]` to target TypeScript `namespace` and `declare module` declarations.

## Why use it

`@module` improves package-level discoverability in generated documentation.

## Options

This rule accepts the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`: limit which declaration kinds are checked.
- `exportMode`: choose whether to check exported declarations, non-exported top-level declarations, or both.
- `includeNonExported`: legacy alias for `exportMode: "all"`.

Flat config example (module-only scope):

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    {
        plugins: {
            "tsdoc-require-2": tsdocRequire,
        },
        rules: {
            "tsdoc-require-2/require-module": [
                "error",
                {
                    enforceFor: ["namespace"],
                },
            ],
        },
    },
];
```

## ❌ Incorrect

```ts
/**
 * Namespace for API surface docs.
 */
export namespace ApiDocs {
    export type Id = string;
}
```

## ✅ Correct

```ts
/**
 * Namespace for API surface docs.
 * @module
 */
export namespace ApiDocs {
    export type Id = string;
}
```

## When not to use it

Disable this rule if your documentation convention does not require `@module` on the declarations targeted by your configuration.

## Further reading

- [TSDoc](https://tsdoc.org)
- [TypeDoc Tags](https://typedoc.org/documents/Tags.html)
- [required-tags](../required-tags.md)
