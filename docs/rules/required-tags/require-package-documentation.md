# tsdoc-require-2/require-package-documentation

Require the `@packageDocumentation` tag in TSDoc blocks for targeted declarations.

## Rule details

This rule reports declarations that already have TSDoc but are missing `@packageDocumentation`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

## Why use it

`@packageDocumentation` helps establish package-level intent and usage context in generated docs.

## Options

This rule supports the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`
- `exportMode`
- `includeNonExported` (legacy alias for `exportMode: "all"`)

Flat config example (namespace/module focused):

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  {
    plugins: {
      "tsdoc-require-2": tsdocRequire,
    },
    rules: {
      "tsdoc-require-2/require-package-documentation": [
        "error",
        {
          enforceFor: ["namespace"],
        },
      ],
    },
  },
];
```

## Examples

### ❌ Incorrect

```ts
/**
 * Public API surface for this package.
 */
export namespace Api {
  export type Id = string;
}
```

### ✅ Correct

```ts
/**
 * Public API surface for this package.
 * @packageDocumentation
 */
export namespace Api {
  export type Id = string;
}
```

## Behavior notes

This rule checks tag presence. It does not enforce where package documentation should be physically located.

## Further reading

- [TSDoc tag reference: @packageDocumentation](https://tsdoc.org/pages/tags/packagedocumentation/)
- [required-tags family overview](../required-tags.md)
