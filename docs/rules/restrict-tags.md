# tsdoc-require-2/restrict-tags

Restrict which tags are allowed in TSDoc blocks using allow/deny lists.

## Rule Details

This rule checks supported TypeScript declarations and default exports that already have TSDoc block comments.

It supports two modes:

- `deny`: configured tags are disallowed.
- `allow`: only configured tags are allowed.

Use this rule to enforce compatibility constraints such as denying TypeDoc compatibility-only tags (`@augments`, `@typedef`, etc.) in strict TSDoc workflows.

## Options

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

## ❌ Incorrect (default deny mode)

```ts
/**
 * Calculates a value.
 * @typedef ResultShape
 */
export function calculate(): number {
    return 1;
}
```

## ✅ Correct (default deny mode)

```ts
/**
 * Calculates a value.
 * @remarks Uses plain TSDoc tags.
 */
export function calculate(): number {
    return 1;
}
```

## ❌ Incorrect (allow mode)

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

With options:

```ts
["error", { mode: "allow", tags: ["@remarks"] }]
```

## ✅ Correct (allow mode)

```ts
/**
 * Calculates a value.
 * @remarks Useful details.
 */
export function calculate(): number {
    return 1;
}
```

With options:

```ts
["error", { mode: "allow", tags: ["@remarks"] }]
```

## Further Reading

- [TSDoc](https://tsdoc.org)
- [TypeDoc Tags](https://typedoc.org/documents/Tags.html)
