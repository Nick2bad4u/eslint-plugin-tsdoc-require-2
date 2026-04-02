# typedoc-strict

Stricter TypeDoc preset that also requires module remarks and denies compatibility-only block tags.

## Config key

`tsdocRequire.configs["typedoc-strict"]`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs["typedoc-strict"],
];
```

## Rules in this preset

- [`tsdoc-require-2/require`](../require.md)
- [`tsdoc-require-2/require-class`](../required-tags/require-class.md)
- [`tsdoc-require-2/require-enum`](../required-tags/require-enum.md)
- [`tsdoc-require-2/require-function`](../required-tags/require-function.md)
- [`tsdoc-require-2/require-interface`](../required-tags/require-interface.md)
- [`tsdoc-require-2/require-module`](../required-tags/require-module.md)
- [`tsdoc-require-2/require-remarks`](../required-tags/require-remarks.md)
- [`tsdoc-require-2/restrict-tags`](../restrict-tags.md)
