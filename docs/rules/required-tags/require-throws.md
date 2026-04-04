# tsdoc-require-2/require-throws

Require the `@throws` tag in TSDoc blocks for targeted declarations.

## Rule details

This rule reports declarations that already have TSDoc but are missing `@throws`.

It does not create a TSDoc block. Pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require comments.

## Why use it

`@throws` documents failure behavior and reduces hidden runtime surprises for consumers.

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
      "tsdoc-require-2/require-throws": [
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
 * Loads a user by ID.
 */
export function loadUser(id: string): string {
  if (id.length === 0) {
    throw new Error("id is required");
  }

  return id;
}
```

### ✅ Correct

```ts
/**
 * Loads a user by ID.
 * @throws Error when the id is empty.
 */
export function loadUser(id: string): string {
  if (id.length === 0) {
    throw new Error("id is required");
  }

  return id;
}
```

## Behavior notes

This rule checks tag presence. It does not verify whether code paths actually throw.

## Further reading

- [TSDoc tag reference: @throws](https://tsdoc.org/pages/tags/throws/)
- [required-tags family overview](../required-tags.md)
