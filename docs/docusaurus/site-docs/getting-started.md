---
sidebar_position: 2
---

# Getting Started

Install the plugin:

```bash
npm install --save-dev eslint-plugin-tsdoc-require-2
```

Then enable it in your Flat Config:

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [tsdocRequire.configs.recommended];
```

Bundled presets are scoped to `.cjs`, `.cts`, `.js`, `.jsx`, `.mjs`, `.mts`,
`.ts`, and `.tsx` files. They can therefore share a Flat Config array with
non-JavaScript language plugins, including JSON configs, without applying the
plugin's `js/js` rules to those files.

## Optional stricter presets

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
 // tsdocRequire.configs.typedoc,
 // tsdocRequire.configs["typedoc-strict"],
 // tsdocRequire.configs.tsdoc,
 // tsdocRequire.configs.jsdoc,
];
```

## Recommended rollout

- Start with one preset.
- Fix violations in small batches.
- Promote warnings to errors after stabilization.

## Rule navigation

Use these docs routes:

- `/docs/rules/` for the full rule list.
- `/docs/rules/presets/` for preset comparisons.
