---
slug: /
title: Rules
description: Explore the comprehensive set of rules provided by eslint-plugin-tsdoc-require-2 to enforce TSDoc/JSDoc documentation standards in your TypeScript codebase.
---

# Rules

`eslint-plugin-tsdoc-require-2` enforces API documentation with three complementary rule families.

## Rule family overview

| Family | Purpose | Start here when |
| --- | --- | --- |
| [`require`](./require.md) | Require a TSDoc block (`/** ... */`) on selected declarations. | You need a documentation baseline first. |
| [`required-tags`](./required-tags.md) | Require specific tags (for example `@param`, `@returns`, `@remarks`) through individual `require-*` rules. | You want documentation completeness and consistency. |
| [`restrict-tags`](./restrict-tags.md) | Allow-list or deny-list tags to control vocabulary and compatibility. | You need a strict tag policy (for example strict TSDoc vs loose JSDoc/TypeDoc tags). |

## How the families work together

Use them in this order:

1. **Presence**: `require` ensures docs exist.
2. **Completeness**: `require-*` rules ensure required tags exist.
3. **Vocabulary**: `restrict-tags` ensures only approved tags are used.

This sequencing reduces confusion because tag rules only matter once comments exist.

## Practical configuration pattern

Use a preset for the baseline, then add focused overrides.

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
	tsdocRequire.configs.recommended,
	{
		rules: {
			"tsdoc-require-2/require-param": ["error", { enforceFor: ["function"] }],
			"tsdoc-require-2/require-returns": ["error", { enforceFor: ["function"] }],
			"tsdoc-require-2/restrict-tags": [
				"error",
				{
					mode: "deny",
					tags: ["@typedef", "@callback"],
				},
			],
		},
	},
];
```

## Where to start

- New adoption: [Getting Started](./getting-started.md)
- Preset selection: [Presets Overview](./presets/index.md)
- Rule family details:
	- [`tsdoc-require-2/require`](./require.md)
	- [`tsdoc-require-2/required-tags` family](./required-tags.md)
	- [`tsdoc-require-2/restrict-tags`](./restrict-tags.md)
