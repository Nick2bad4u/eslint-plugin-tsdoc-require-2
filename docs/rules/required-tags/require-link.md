# tsdoc-require-2/require-link

Require the `@link` tag in TSDoc blocks for exported declarations.

## Rule details

By default, this rule reports exported declarations (and supported default exports) that have TSDoc but are missing `@link`. Set `includeNonExported: true` to also check non-exported top-level declarations.

It supports the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`: choose which declaration kinds are checked.
- `includeNonExported`: when `true`, also check non-exported top-level declarations (default: `false`).

## Options

```json
{
  "rules": {
    "tsdoc-require-2/require-link": [
      "error",
      {
        "enforceFor": ["class", "function", "interface", "type", "enum", "variable", "object"]
      }
    ]
  }
}
```

## Examples

### ❌ Incorrect

```ts
/**
 * Performs a task.
 */
export function runTask(value: string): string {
  return value;
}
```

### ✅ Correct

```ts
/**
 * Performs a task.
 * @link
 */
export function runTask(value: string): string {
  return value;
}
```

## Further reading

- TSDoc tag reference: <https://tsdoc.org/pages/tags/link/>
- Rule index: [required-tags](../required-tags.md)