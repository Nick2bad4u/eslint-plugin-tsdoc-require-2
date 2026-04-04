# typedoc-strict

Stricter TypeDoc preset that also requires module remarks and denies compatibility-only block tags.

## What this preset is for

Use `typedoc-strict` when you want TypeDoc-oriented declaration tagging plus stricter narrative and tag vocabulary discipline.

This preset is a good fit for:

- public SDKs with strict documentation standards
- multi-package libraries with clear module-level docs requirements
- teams that need consistent TypeDoc-friendly output with reduced tag sprawl

## What this preset enables

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-class`](../required-tags/require-class.md) with `enforceFor: ["class"]`
- [`tsdoc-require-2/require-enum`](../required-tags/require-enum.md) with `enforceFor: ["enum"]`
- [`tsdoc-require-2/require-function`](../required-tags/require-function.md) with `enforceFor: ["function"]`
- [`tsdoc-require-2/require-interface`](../required-tags/require-interface.md) with `enforceFor: ["interface"]`
- [`tsdoc-require-2/require-module`](../required-tags/require-module.md) with `enforceFor: ["namespace"]`
- [`tsdoc-require-2/require-remarks`](../required-tags/require-remarks.md)
- [`tsdoc-require-2/restrict-tags`](../restrict-tags.md) in deny mode for TypeDoc compatibility tags

## Why this preset is stricter than `typedoc`

Compared to `typedoc`, this preset adds:

- module-level docs (`@module`)
- narrative context (`@remarks`)
- explicit tag vocabulary restrictions

## Config key

`tsdocRequire.configs["typedoc-strict"]`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs["typedoc-strict"],
];
```

## Common customization

If your project intentionally uses some denied tags, override `restrict-tags.tags` with a narrower deny list instead of disabling the rule.
