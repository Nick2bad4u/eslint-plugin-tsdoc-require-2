# Getting Started

`eslint-plugin-tsdoc-require-2` is easiest to adopt in layers:

1. **Require docs to exist** with [`tsdoc-require-2/require`](./require.md).
2. **Require specific tags** with one or more [`require-*` rules](./required-tags.md).
3. **Restrict allowed tag vocabulary** with [`tsdoc-require-2/restrict-tags`](./restrict-tags.md).

Starting from a preset gives you a stable baseline before you tune rule options.

## 1) Install

```bash
npm install --save-dev eslint-plugin-tsdoc-require-2
```

## 2) Choose one preset baseline

Pick **one** preset as your starting point:

| Preset | Best for |
| --- | --- |
| [`recommended`](./presets/recommended.md) | Minimal rollout: require TSDoc comments only. |
| [`detailed`](./presets/detailed.md) | Require comments + `@remarks` for richer docs. |
| [`packages`](./presets/packages.md) | Package/library docs including `@packageDocumentation`. |
| [`jsdoc`](./presets/jsdoc.md) | Function-tag baseline (`@param`, `@returns`, `@throws`) with JSDoc-friendly behavior. |
| [`tsdoc`](./presets/tsdoc.md) | Strong TSDoc baseline with tag requirements + compatibility-tag restrictions. |
| [`typedoc`](./presets/typedoc.md) | TypeDoc-oriented declaration-kind tag enforcement. |
| [`typedoc-strict`](./presets/typedoc-strict.md) | Stricter TypeDoc baseline with module remarks and restricted tags. |
| [`all`](./presets/all.md) | Every rule. Useful for audits, usually too strict for day-one adoption. |

## 3) Enable a preset in Flat Config

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [tsdocRequire.configs.recommended];
```

## 4) Add targeted overrides (recommended)

After selecting a preset, add a second config block to tune scope/options.

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
    tsdocRequire.configs.tsdoc,
    {
        rules: {
            "tsdoc-require-2/require": [
                "error",
                {
                    exportMode: "all",
                },
            ],
            "tsdoc-require-2/restrict-tags": [
                "error",
                {
                    exportMode: "all",
                    mode: "deny",
                    tags: ["@typedef", "@callback"],
                },
            ],
        },
    },
];
```

## How to use the rules together

Treat the rules as a pipeline:

1. **Presence layer:** `require` ensures there is a TSDoc block.
2. **Content layer:** `require-*` tag rules enforce required fields (for example `@param`).
3. **Vocabulary layer:** `restrict-tags` blocks unsupported tags.

### Important composition tip

Keep `exportMode` and `enforceFor` aligned across rules. If one rule checks only exported declarations but another checks all declarations, your policy can feel inconsistent.

### Important allow-mode tip

When using `restrict-tags` with `mode: "allow"`, include every tag required by enabled `require-*` rules, or the rules will conflict.

## Suggested rollout strategy

1. Start with `recommended`.
2. Add only the tag rules your team can consistently maintain (`@param`, `@returns`, `@throws`, `@remarks` are common first picks).
3. Add `restrict-tags` only after your required-tag policy is stable.
4. Expand from `exportMode: "exported"` to `"all"` when internal documentation quality is a goal.

## Next steps

- Compare presets in [Presets Overview](./presets/index.md).
- Review [Rules Overview](./index.md).
- Learn the foundational rule in [`tsdoc-require-2/require`](./require.md).
