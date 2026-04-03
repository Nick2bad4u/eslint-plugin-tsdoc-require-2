# tsdoc-require-2/require-expand

Require the `@expand` tag in TSDoc blocks for supported TypeScript declarations.

## Rule Details

This rule reports supported declarations and default exports when a TSDoc block exists but does not contain `@expand`. It does not create the TSDoc block itself, so pair it with [`tsdoc-require-2/require`](../require.md) when you also want to require the comment.

## Options

This rule accepts the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`: limit which declaration kinds are checked.
- `exportMode`: choose whether to check exported declarations, non-exported top-level declarations, or both.
- `includeNonExported`: legacy alias for `exportMode: "all"`.

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

## ❌ Incorrect

```ts
/**
 * Performs a tagged operation.
 */
export function taggedFunction(value: string): string {
    return value;
}
```

## ✅ Correct

```ts
/**
 * Performs a tagged operation.
 * @expand
 */
export function taggedFunction(value: string): string {
    return value;
}
```

## When Not To Use It

Disable this rule if your documentation convention does not require `@expand` on the declarations targeted by your configuration.

## Further Reading

- [TSDoc](https://tsdoc.org)
- [TypeDoc Tags](https://typedoc.org/documents/Tags.html)
- [required-tags](../required-tags.md)
