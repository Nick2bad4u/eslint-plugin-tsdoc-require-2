# tsdoc-require-2/require-readonly

Require the `@readonly` tag in TSDoc blocks for exported declarations.

## Rule details

This rule reports exported declarations (and supported default exports) that have TSDoc but are missing `@readonly`.

It supports the same options as [`tsdoc-require-2/require`](../require.md):

- `enforceFor`: choose which exported declaration kinds are checked.

## Options

```json
{
  "rules": {
    "tsdoc-require-2/require-readonly": [
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
 * @readonly
 */
export function runTask(value: string): string {
  return value;
}
```

## Further reading

- TSDoc tag reference: <https://tsdoc.org/pages/tags/readonly/>
- Rule index: [required-tags](../required-tags.md)