# tsdoc-require-2/required-tags

> **Rule catalog ID:** R100

## Targeted pattern scope

This family of rules targets TSDoc blocks.

## What this rule reports

Reports missing required tags.

## Why this rule exists

Enforces consistency.

## ❌ Incorrect

```ts
// See individual rule docs
```

## ✅ Correct

```ts
// See individual rule docs
```



Require specific TSDoc tags to exist in TSDoc blocks for supported TypeScript declarations and default exports.

These rules only report declarations that already have a TSDoc block. Pair them with [`tsdoc-require-2/require`](./require.md) when you also want to require the comment itself.

## Additional examples

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

### Shared options

Each rule accepts the same option shape:

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

- `enforceFor`: limits which declaration kinds are checked.
- `exportMode`: chooses whether to check exported declarations, non-exported top-level declarations, or both.
- `includeNonExported`: legacy alias for `exportMode: "all"`.

`"namespace"` covers both `namespace Foo {}` and `declare module "pkg" {}` declarations.

For behavior and examples, open each individual rule document linked above.

## Further reading

- [TSDoc](https://tsdoc.org)
