# tsdoc

TSDoc-focused preset with function/type-parameter requirements and compatibility-tag restrictions.

## Config key

`tsdocRequire.configs.tsdoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.tsdoc,
];
```

## Rules in this preset

- `tsdoc-require-2/require`
- `tsdoc-require-2/require-param`
- `tsdoc-require-2/require-remarks`
- `tsdoc-require-2/require-returns`
- `tsdoc-require-2/require-throws`
- `tsdoc-require-2/require-type-param`
- `tsdoc-require-2/restrict-tags`
