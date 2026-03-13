# required-tags

Require specific TSDoc tags to exist in TSDoc blocks for exported declarations.

## Rules in this family

- `tsdoc-require-2/require-alpha`
- `tsdoc-require-2/require-beta`
- `tsdoc-require-2/require-decorator`
- `tsdoc-require-2/require-default-value`
- `tsdoc-require-2/require-deprecated`
- `tsdoc-require-2/require-event-property`
- `tsdoc-require-2/require-example`
- `tsdoc-require-2/require-experimental`
- `tsdoc-require-2/require-inherit-doc`
- `tsdoc-require-2/require-internal`
- `tsdoc-require-2/require-label`
- `tsdoc-require-2/require-link`
- `tsdoc-require-2/require-override`
- `tsdoc-require-2/require-package-documentation`
- `tsdoc-require-2/require-param`
- `tsdoc-require-2/require-private-remarks`
- `tsdoc-require-2/require-public`
- `tsdoc-require-2/require-readonly`
- `tsdoc-require-2/require-remarks`
- `tsdoc-require-2/require-returns`
- `tsdoc-require-2/require-sealed`
- `tsdoc-require-2/require-see`
- `tsdoc-require-2/require-throws`
- `tsdoc-require-2/require-type-param`
- `tsdoc-require-2/require-virtual`

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

## Per-rule anchors

### require-alpha

Requires `@alpha`.

### require-beta

Requires `@beta`.

### require-decorator

Requires `@decorator`.

### require-default-value

Requires `@defaultValue`.

### require-deprecated

Requires `@deprecated`.

### require-event-property

Requires `@eventProperty`.

### require-example

Requires `@example`.

### require-experimental

Requires `@experimental`.

### require-inherit-doc

Requires `@inheritDoc`.

### require-internal

Requires `@internal`.

### require-label

Requires `@label`.

### require-link

Requires `@link`.

### require-override

Requires `@override`.

### require-package-documentation

Requires `@packageDocumentation`.

### require-param

Requires `@param`.

### require-private-remarks

Requires `@privateRemarks`.

### require-public

Requires `@public`.

### require-readonly

Requires `@readonly`.

### require-remarks

Requires `@remarks`.

### require-returns

Requires `@returns`.

### require-sealed

Requires `@sealed`.

### require-see

Requires `@see`.

### require-throws

Requires `@throws`.

### require-type-param

Requires `@typeParam`.

### require-virtual

Requires `@virtual`.
