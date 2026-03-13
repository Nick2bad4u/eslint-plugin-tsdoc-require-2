# tsdoc-require-2/require-internal

Require the `@internal` tag in TSDoc blocks for exported declarations.

## Rule details

This rule reports exported declarations (and supported default exports) that have TSDoc but are missing `@internal`.

It supports the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`: choose which exported declaration kinds are checked.

## Options

```json
{
  "rules": {
    "tsdoc-require-2/require-internal": [
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
 * @internal
 */
export function runTask(value: string): string {
  return value;
}
```

## Further reading

- TSDoc tag reference: <https://tsdoc.org/pages/tags/internal/>
- Rule index: [required-tags](../required-tags.md)