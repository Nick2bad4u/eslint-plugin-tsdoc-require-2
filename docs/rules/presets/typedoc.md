# typedoc

Conservative TypeDoc-oriented preset with declaration-kind tags that are safe to infer.

## Config key

`tsdocRequire.configs.typedoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.typedoc,
];
```

## Rules in this preset

- `tsdoc-require-2/require`
- `tsdoc-require-2/require-class`
- `tsdoc-require-2/require-enum`
- `tsdoc-require-2/require-function`
- `tsdoc-require-2/require-interface`
