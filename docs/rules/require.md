# tsdoc-require-2/require

Require TSDoc comments for supported TypeScript declarations and default exports, with configurable export scope.

> **Rule catalog ID:** R001

## Targeted pattern scope

By default, this rule reports exported declarations that do not have a TSDoc block comment (`/** ... */`) directly above them.

## What this rule reports

It checks:

- exported classes
- exported functions
- exported interfaces
- exported namespaces and `declare module` declarations
- exported type aliases
- exported enums
- exported variables
- default exports (including default-exported identifiers)

When `exportMode: "all"` is enabled, the same checks also apply to non-exported top-level declarations. When `exportMode: "non-exported"` is enabled, only non-exported top-level declarations are checked.

## Why this rule exists

Why this matters: if exported APIs are undocumented, consumers have to inspect implementation details instead of reading a stable contract.

## ❌ Incorrect

```ts
export class MissingDocs {}

interface Shape {
  radius: number;
}

export { Shape };

const createUser = () => ({ id: "1" });
export default createUser;
```

## ✅ Correct

```ts
/** Public class used by external callers. */
export class DocumentedClass {}

/** Shape shared in the public API. */
interface Shape {
  radius: number;
}

export { Shape };

/** Creates the default exported user payload. */
const createUser = () => ({ id: "1" });
export default createUser;
```

## Additional examples

### Options

This rule accepts one optional object.

```ts
type Options = [
  {
    enforceFor?: Array<
      "class" |
      "enum" |
      "function" |
      "interface" |
      "namespace" |
      "object" |
      "type" |
      "variable"
    >;
    exportMode?: "all" | "exported" | "non-exported";
    includeNonExported?: boolean;
  },
];
```

Default options:

```ts
[
  {
    enforceFor: ["class", "enum", "function", "interface", "namespace", "object", "type", "variable"],
    exportMode: "exported",
  },
]
```

### `enforceFor`

Limits which entity kinds are checked.

Example flat config that only enforces docs for classes and functions:

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  {
    plugins: {
      "tsdoc-require-2": tsdocRequire,
    },
    rules: {
      "tsdoc-require-2/require": [
        "error",
        {
          enforceFor: ["class", "function"],
        },
      ],
    },
  },
];
```

### `exportMode`

Controls whether the rule checks exported declarations, non-exported top-level declarations, or both.

- `"exported"` (default): check exported declarations and default exports.
- `"non-exported"`: only check supported non-exported top-level declarations.
- `"all"`: check both exported and non-exported top-level declarations.

Example flat config:

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  {
    plugins: {
      "tsdoc-require-2": tsdocRequire,
    },
    rules: {
      "tsdoc-require-2/require": [
        "error",
        {
          exportMode: "all",
        },
      ],
    },
  },
];
```

### `includeNonExported`

`includeNonExported` is still supported as a backward-compatible alias for `exportMode: "all"`. Prefer `exportMode` in new configurations because it can also express `"non-exported"` explicitly.

## When not to use it

Disable this rule if your project intentionally does not require API documentation on exported declarations (or internal declarations when `includeNonExported` is enabled).

## Further reading

- [TSDoc](https://tsdoc.org)
- [ESLint custom rule docs](https://eslint.org/docs/latest/extend/custom-rules)
