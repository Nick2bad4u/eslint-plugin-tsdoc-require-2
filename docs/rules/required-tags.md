# required-tags

Require specific TSDoc tags to exist in TSDoc blocks for exported declarations.

## Rules in this family

- [`tsdoc-require-2/require-alpha`](./required-tags/require-alpha.md)
- [`tsdoc-require-2/require-beta`](./required-tags/require-beta.md)
- [`tsdoc-require-2/require-decorator`](./required-tags/require-decorator.md)
- [`tsdoc-require-2/require-default-value`](./required-tags/require-default-value.md)
- [`tsdoc-require-2/require-deprecated`](./required-tags/require-deprecated.md)
- [`tsdoc-require-2/require-event-property`](./required-tags/require-event-property.md)
- [`tsdoc-require-2/require-example`](./required-tags/require-example.md)
- [`tsdoc-require-2/require-experimental`](./required-tags/require-experimental.md)
- [`tsdoc-require-2/require-inherit-doc`](./required-tags/require-inherit-doc.md)
- [`tsdoc-require-2/require-internal`](./required-tags/require-internal.md)
- [`tsdoc-require-2/require-label`](./required-tags/require-label.md)
- [`tsdoc-require-2/require-link`](./required-tags/require-link.md)
- [`tsdoc-require-2/require-override`](./required-tags/require-override.md)
- [`tsdoc-require-2/require-package-documentation`](./required-tags/require-package-documentation.md)
- [`tsdoc-require-2/require-param`](./required-tags/require-param.md)
- [`tsdoc-require-2/require-private-remarks`](./required-tags/require-private-remarks.md)
- [`tsdoc-require-2/require-public`](./required-tags/require-public.md)
- [`tsdoc-require-2/require-readonly`](./required-tags/require-readonly.md)
- [`tsdoc-require-2/require-remarks`](./required-tags/require-remarks.md)
- [`tsdoc-require-2/require-returns`](./required-tags/require-returns.md)
- [`tsdoc-require-2/require-sealed`](./required-tags/require-sealed.md)
- [`tsdoc-require-2/require-see`](./required-tags/require-see.md)
- [`tsdoc-require-2/require-throws`](./required-tags/require-throws.md)
- [`tsdoc-require-2/require-type-param`](./required-tags/require-type-param.md)
- [`tsdoc-require-2/require-virtual`](./required-tags/require-virtual.md)

## Shared options

Each rule accepts the same option shape:

```ts
[
    {
        enforceFor?: Array<
            | "class"
            | "enum"
            | "function"
            | "interface"
            | "object"
            | "type"
            | "variable"
        >;
    },
]
```

Default:

```ts
[
    {
        enforceFor: [
            "class",
            "enum",
            "function",
            "interface",
            "object",
            "type",
            "variable",
        ],
    },
]
```

For behavior and examples, open each individual rule document linked above.
