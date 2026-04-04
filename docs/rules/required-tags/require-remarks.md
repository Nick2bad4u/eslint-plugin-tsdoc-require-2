# tsdoc-require-2/require-remarks

Require the `@remarks` tag in TSDoc blocks for targeted declarations.

## Rule details

This rule reports declarations that already have TSDoc but are missing `@remarks`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

## Why use it

`@remarks` captures context that does not fit in a one-line summary, such as caveats, migration notes, or runtime assumptions.

## Options

This rule supports the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`
- `exportMode`
- `includeNonExported` (legacy alias for `exportMode: "all"`)

Flat config example:

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  {
    plugins: {
      "tsdoc-require-2": tsdocRequire,
    },
    rules: {
      "tsdoc-require-2/require-remarks": "error",
    },
  },
];
```

## Examples

### ❌ Incorrect

```ts
/**
 * Loads the project configuration.
 */
export function loadConfig(): string {
  return "default";
}
```

### ✅ Correct

```ts
/**
 * Loads the project configuration.
 * @remarks Falls back to default values when no config file exists.
 */
export function loadConfig(): string {
  return "default";
}
```

## Behavior notes

This rule checks tag presence. It does not validate the depth or quality of the remarks text.

## Further reading

- [TSDoc tag reference: @remarks](https://tsdoc.org/pages/tags/remarks/)
- [required-tags family overview](../required-tags.md)
