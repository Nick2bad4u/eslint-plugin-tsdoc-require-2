# tsdoc-require-2/require-returns

Require the `@returns` tag in TSDoc blocks for targeted declarations.

## Rule details

This rule reports declarations that already have TSDoc but are missing `@returns`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

## Why use it

`@returns` makes output contracts explicit and easier to review.

## Options

This rule supports the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`
- `exportMode`
- `includeNonExported` (legacy alias for `exportMode: "all"`)

Flat config example (function-focused scope):

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  {
    plugins: {
      "tsdoc-require-2": tsdocRequire,
    },
    rules: {
      "tsdoc-require-2/require-returns": [
        "error",
        {
          enforceFor: ["function"],
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
 * Converts input to a stable ID.
 */
export function toStableId(value: string): string {
  return value.trim().toLowerCase();
}
```

### ✅ Correct

```ts
/**
 * Converts input to a stable ID.
 * @returns Lower-cased stable ID.
 */
export function toStableId(value: string): string {
  return value.trim().toLowerCase();
}
```

## Behavior notes

This rule checks tag presence. It does not validate return description quality or return-type accuracy.

## Further reading

- [TSDoc tag reference: @returns](https://tsdoc.org/pages/tags/returns/)
- [required-tags family overview](../required-tags.md)
