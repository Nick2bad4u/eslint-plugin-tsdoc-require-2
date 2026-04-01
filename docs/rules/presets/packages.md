# packages

Package-focused preset for package entrypoint and module-level narrative docs.

## Config key

`tsdocRequire.configs.packages`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.packages,
];
```

## Rules in this preset

- `tsdoc-require-2/require`
- `tsdoc-require-2/require-package-documentation`
- `tsdoc-require-2/require-remarks`
