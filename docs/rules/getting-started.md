# Getting Started

Install the plugin:

```bash
npm install --save-dev eslint-plugin-tsdoc-require-2
```

Then enable a preset in Flat Config:

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.recommended,
];
```

## Optional stricter presets

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    // tsdocRequire.configs.detailed,
    // tsdocRequire.configs.packages,
    // tsdocRequire.configs.typedoc,
    // tsdocRequire.configs["typedoc-strict"],
    // tsdocRequire.configs.tsdoc,
    // tsdocRequire.configs.jsdoc,
    // tsdocRequire.configs.all,
];
```

## Next steps

- Compare presets in [Presets Overview](./presets/index.md).
- Browse [Rules Overview](./index.md).
- Start with [`tsdoc-require-2/require`](./require.md).
