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

- `tsdoc-require-2/require`
- `tsdoc-require-2/require-class`
- `tsdoc-require-2/require-enum`
- `tsdoc-require-2/require-function`
- `tsdoc-require-2/require-interface`
- `tsdoc-require-2/require-module`
- `tsdoc-require-2/require-remarks`
- `tsdoc-require-2/restrict-tags`
