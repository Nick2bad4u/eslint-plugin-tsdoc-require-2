# tsdoc-require-2/required-tags

> **Rule catalog ID:** R100

## Targeted pattern scope

This page documents the **required-tag rule family** (`require-*`).

Each `require-*` rule checks declarations that already have TSDoc and reports when its specific tag is missing.

Examples:

- `tsdoc-require-2/require-param` requires `@param`
- `tsdoc-require-2/require-returns` requires `@returns`
- `tsdoc-require-2/require-remarks` requires `@remarks`

## What this rule reports

For each enabled `require-*` rule, reports declarations where:

- a TSDoc block exists, and
- the required tag for that rule does not appear in the block.

Like [`tsdoc-require-2/require`](./require.md), required-tag rules support declaration targeting (`enforceFor`) and export scope (`exportMode` / `includeNonExported`).

## Why this rule exists

Comment presence alone does not guarantee useful docs.

Required-tag rules let you enforce documentation contracts such as:

- every documented function has `@param` / `@returns`
- every package entry has `@packageDocumentation`
- every declaration includes `@remarks` for implementation context

Together, these rules turn documentation from optional prose into a consistent API contract.

## ❌ Incorrect

```ts
/**
 * Creates a user record.
 */
export function createUser(name: string): string {
  return name;
}
```

With:

```ts
["error", { enforceFor: ["function"] }]
```

for `tsdoc-require-2/require-param` and `tsdoc-require-2/require-returns`.

## ✅ Correct

```ts
/**
 * Creates a user record.
 * @param name - User display name.
 * @returns Persisted user ID.
 */
export function createUser(name: string): string {
  return name;
}
```

## Behavior and migration notes

- No single runtime rule key named `tsdoc-require-2/required-tags` exists; enable individual `require-*` rules.
- Required-tag rules only validate comments that exist. Pair them with [`tsdoc-require-2/require`](./require.md).
- If you also enable [`tsdoc-require-2/restrict-tags`](./restrict-tags.md) in `allow` mode, include all required tags in the allow-list to avoid policy conflicts.
- Keep `enforceFor` and `exportMode` aligned across `require`, `require-*`, and `restrict-tags` for predictable results.

## Additional examples

### Shared options

Each `require-*` rule accepts the same option shape:

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
  },
]
```

### Rules in this family

- [`tsdoc-require-2/require-abstract`](./required-tags/require-abstract.md)
- [`tsdoc-require-2/require-alpha`](./required-tags/require-alpha.md)
- [`tsdoc-require-2/require-author`](./required-tags/require-author.md)
- [`tsdoc-require-2/require-beta`](./required-tags/require-beta.md)
- [`tsdoc-require-2/require-category`](./required-tags/require-category.md)
- [`tsdoc-require-2/require-class`](./required-tags/require-class.md)
- [`tsdoc-require-2/require-decorator`](./required-tags/require-decorator.md)
- [`tsdoc-require-2/require-default-value`](./required-tags/require-default-value.md)
- [`tsdoc-require-2/require-deprecated`](./required-tags/require-deprecated.md)
- [`tsdoc-require-2/require-document`](./required-tags/require-document.md)
- [`tsdoc-require-2/require-enum`](./required-tags/require-enum.md)
- [`tsdoc-require-2/require-event`](./required-tags/require-event.md)
- [`tsdoc-require-2/require-event-property`](./required-tags/require-event-property.md)
- [`tsdoc-require-2/require-example`](./required-tags/require-example.md)
- [`tsdoc-require-2/require-expand`](./required-tags/require-expand.md)
- [`tsdoc-require-2/require-experimental`](./required-tags/require-experimental.md)
- [`tsdoc-require-2/require-function`](./required-tags/require-function.md)
- [`tsdoc-require-2/require-group`](./required-tags/require-group.md)
- [`tsdoc-require-2/require-hidden`](./required-tags/require-hidden.md)
- [`tsdoc-require-2/require-hideconstructor`](./required-tags/require-hideconstructor.md)
- [`tsdoc-require-2/require-ignore`](./required-tags/require-ignore.md)
- [`tsdoc-require-2/require-import`](./required-tags/require-import.md)
- [`tsdoc-require-2/require-include`](./required-tags/require-include.md)
- [`tsdoc-require-2/require-inherit-doc`](./required-tags/require-inherit-doc.md)
- [`tsdoc-require-2/require-inline`](./required-tags/require-inline.md)
- [`tsdoc-require-2/require-interface`](./required-tags/require-interface.md)
- [`tsdoc-require-2/require-internal`](./required-tags/require-internal.md)
- [`tsdoc-require-2/require-label`](./required-tags/require-label.md)
- [`tsdoc-require-2/require-license`](./required-tags/require-license.md)
- [`tsdoc-require-2/require-link`](./required-tags/require-link.md)
- [`tsdoc-require-2/require-merge-module-with`](./required-tags/require-merge-module-with.md)
- [`tsdoc-require-2/require-module`](./required-tags/require-module.md)
- [`tsdoc-require-2/require-namespace`](./required-tags/require-namespace.md)
- [`tsdoc-require-2/require-overload`](./required-tags/require-overload.md)
- [`tsdoc-require-2/require-override`](./required-tags/require-override.md)
- [`tsdoc-require-2/require-package-documentation`](./required-tags/require-package-documentation.md)
- [`tsdoc-require-2/require-param`](./required-tags/require-param.md)
- [`tsdoc-require-2/require-primary-export`](./required-tags/require-primary-export.md)
- [`tsdoc-require-2/require-private`](./required-tags/require-private.md)
- [`tsdoc-require-2/require-private-remarks`](./required-tags/require-private-remarks.md)
- [`tsdoc-require-2/require-property`](./required-tags/require-property.md)
- [`tsdoc-require-2/require-protected`](./required-tags/require-protected.md)
- [`tsdoc-require-2/require-public`](./required-tags/require-public.md)
- [`tsdoc-require-2/require-readonly`](./required-tags/require-readonly.md)
- [`tsdoc-require-2/require-remarks`](./required-tags/require-remarks.md)
- [`tsdoc-require-2/require-returns`](./required-tags/require-returns.md)
- [`tsdoc-require-2/require-sealed`](./required-tags/require-sealed.md)
- [`tsdoc-require-2/require-see`](./required-tags/require-see.md)
- [`tsdoc-require-2/require-since`](./required-tags/require-since.md)
- [`tsdoc-require-2/require-sort-strategy`](./required-tags/require-sort-strategy.md)
- [`tsdoc-require-2/require-summary`](./required-tags/require-summary.md)
- [`tsdoc-require-2/require-template`](./required-tags/require-template.md)
- [`tsdoc-require-2/require-throws`](./required-tags/require-throws.md)
- [`tsdoc-require-2/require-type-param`](./required-tags/require-type-param.md)
- [`tsdoc-require-2/require-use-declared-type`](./required-tags/require-use-declared-type.md)
- [`tsdoc-require-2/require-virtual`](./required-tags/require-virtual.md)

## ESLint flat config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  tsdocRequire.configs.recommended,
  {
    rules: {
      "tsdoc-require-2/require-param": ["error", { enforceFor: ["function"] }],
      "tsdoc-require-2/require-returns": ["error", { enforceFor: ["function"] }],
      "tsdoc-require-2/require-throws": ["error", { enforceFor: ["function"] }],
    },
  },
];
```

## When not to use it

If your team prefers free-form narrative comments and does not want tag-level structure, required-tag rules may add noise.

In that case, keep `tsdoc-require-2/require` enabled and only add the strict tag rules that provide clear value.

## Further reading

- [TSDoc](https://tsdoc.org)
- [Rule family: require](./require.md)
- [Rule family: restrict-tags](./restrict-tags.md)
