# jsdoc

JSDoc-leaning preset focused on function documentation tags (`@param`, `@returns`, `@throws`).

## Config key

`tsdocRequire.configs.jsdoc`

## Flat Config example

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.jsdoc,
];
```

## Rules in this preset

- `tsdoc-require-2/require`
- `tsdoc-require-2/require-param`
- `tsdoc-require-2/require-returns`
- `tsdoc-require-2/require-throws`
