# tsdoc-require-2/require-type-param

Require the `@typeParam` tag in TSDoc blocks for targeted declarations.

## Rule details

This rule reports declarations that already have TSDoc but are missing `@typeParam`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

## Why use it

`@typeParam` makes generic contracts easier to understand for callers and maintainers.

## Options

This rule supports the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`
- `exportMode`
- `includeNonExported` (legacy alias for `exportMode: "all"`)

Flat config example (generic declarations only):

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  {
    plugins: {
      "tsdoc-require-2": tsdocRequire,
    },
    rules: {
      "tsdoc-require-2/require-type-param": [
        "error",
        {
          enforceFor: ["class", "function", "interface", "type"],
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
 * Wraps data in a typed container.
 */
export function wrap<T>(value: T): { value: T } {
  return { value };
}
```

### ✅ Correct

```ts
/**
 * Wraps data in a typed container.
 * @typeParam T - Value type stored in the wrapper.
 */
export function wrap<T>(value: T): { value: T } {
  return { value };
}
```

## Behavior notes

This rule checks tag presence. It does not verify one `@typeParam` tag per generic parameter.

## Further reading

- [TSDoc tag reference: @typeParam](https://tsdoc.org/pages/tags/typeparam/)
- [required-tags family overview](../required-tags.md)
