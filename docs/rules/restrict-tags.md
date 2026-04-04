# tsdoc-require-2/restrict-tags

Restrict which tags are allowed in TSDoc blocks using allow/deny lists.

> **Rule catalog ID:** R002

## Targeted pattern scope

This rule checks supported TypeScript declarations and default exports **that already have TSDoc block comments**.

By default, it runs on exported declarations and default exports. You can widen or narrow scope with `exportMode` and `enforceFor`.

## What this rule reports

This rule supports two modes:

- `deny`: configured tags are forbidden.
- `allow`: only configured tags are permitted.

Default mode is `deny`, with a default blocked set focused on TypeDoc compatibility tags:

- `@augments`
- `@callback`
- `@extends`
- `@jsx`
- `@satisfies`
- `@type`
- `@typedef`
- `@yields`

## Why this rule exists

A docs policy needs both **required information** and **controlled vocabulary**.

`restrict-tags` prevents drift from your chosen documentation standard by blocking unsupported tags or enforcing an explicit allow-list.

Use it with:

- [`tsdoc-require-2/require`](./require.md) to enforce comment presence.
- [`require-*` rules](./required-tags.md) to enforce mandatory tags.

## ❌ Incorrect

```ts
/**
 * Calculates a value.
 * @typedef ResultShape
 */
export function calculate(): number {
  return 1;
}
```

With default configuration (`mode: "deny"`).

## ✅ Correct

```ts
/**
 * Calculates a value.
 * @remarks Uses plain TSDoc tags.
 */
export function calculate(): number {
  return 1;
}
```

With default configuration (`mode: "deny"`).

## Behavior and migration notes

- This rule does not require comments on its own; it only validates tags found inside existing TSDoc blocks.
- In `allow` mode, any tag not listed in `tags` is reported.
- If you combine `allow` mode with required-tag rules, include all required tags in the allow-list or the rules will conflict.
- Keep `enforceFor` and `exportMode` aligned with `require` and `require-*` rules for consistent policy.

## Additional examples

### Options

```ts
type Options = [
  {
    enforceFor?: Array<
      | "class"
      | "enum"
      | "function"
      | "interface"
      | "namespace"
      | "object"
      | "type"
      | "variable"
    >;
    exportMode?: "all" | "exported" | "non-exported";
    includeNonExported?: boolean;
    mode?: "allow" | "deny";
    tags?: Array<`@${string}`>;
  },
];
```

Default options:

```ts
[
  {
    enforceFor: [
      "class",
      "enum",
      "function",
      "interface",
      "namespace",
      "object",
      "type",
      "variable",
    ],
    exportMode: "exported",
    mode: "deny",
    tags: [
      "@augments",
      "@callback",
      "@extends",
      "@jsx",
      "@satisfies",
      "@type",
      "@typedef",
      "@yields",
    ],
  },
]
```

### Allow mode example

#### Invalid in allow mode

```ts
/**
 * Calculates a value.
 * @remarks Useful details.
 * @deprecated Use newCalculate instead.
 */
export function calculate(): number {
  return 1;
}
```

With:

```ts
["error", { mode: "allow", tags: ["@remarks"] }]
```

#### Valid in allow mode

```ts
/**
 * Calculates a value.
 * @remarks Useful details.
 */
export function calculate(): number {
  return 1;
}
```

With:

```ts
["error", { mode: "allow", tags: ["@remarks"] }]
```

## ESLint flat config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  tsdocRequire.configs.tsdoc,
  {
    rules: {
      "tsdoc-require-2/restrict-tags": [
        "error",
        {
          mode: "deny",
          tags: ["@typedef", "@callback"],
        },
      ],
    },
  },
];
```

## When not to use it

If your team intentionally allows free-form mixtures of TSDoc, JSDoc, and TypeDoc tags, this rule can create unnecessary friction.

In that case, keep required-tag rules only for tags you truly need.

## Further reading

- [TSDoc](https://tsdoc.org)
- [TypeDoc tags reference](https://typedoc.org/documents/Tags.html)
- [Rule family: required-tags](./required-tags.md)
