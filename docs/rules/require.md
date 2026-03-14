# tsdoc-require-2/require

Requires TSDoc comments for exported TypeScript declarations and default exports, with optional enforcement for non-exported top-level declarations.

## Rule Details

By default, this rule reports exported declarations that do not have a TSDoc block comment (`/** ... */`) directly above them.

It checks:

- exported classes
- exported functions
- exported interfaces
- exported type aliases
- exported enums
- exported variables
- default exports (including default-exported identifiers)

When `includeNonExported: true` is enabled, the same checks also apply to non-exported top-level declarations.

Why this matters: if exported APIs are undocumented, consumers have to inspect implementation details instead of reading a stable contract.

### ❌ Incorrect

```ts
export class MissingDocs {}

interface Shape {
	radius: number;
}

export { Shape };

const createUser = () => ({ id: "1" });
export default createUser;
```

### ✅ Correct

```ts
/** Public class used by external callers. */
export class DocumentedClass {}

/** Shape shared in the public API. */
interface Shape {
	radius: number;
}

export { Shape };

/** Creates the default exported user payload. */
const createUser = () => ({ id: "1" });
export default createUser;
```

## Options

This rule accepts one optional object.

```ts
type Options = [
	{
		enforceFor?: Array<
			"class" |
			"enum" |
			"function" |
			"interface" |
			"object" |
			"type" |
			"variable"
		>;
		includeNonExported?: boolean;
	},
];
```

Default options:

```ts
[
	{
		enforceFor: ["class", "enum", "function", "interface", "object", "type", "variable"],
		includeNonExported: false,
	},
]
```

### `enforceFor`

Limits which entity kinds are checked.

Example flat config that only enforces docs for classes and functions:

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
	{
		plugins: {
			"tsdoc-require-2": tsdocRequire,
		},
		rules: {
			"tsdoc-require-2/require": [
				"error",
				{
					enforceFor: ["class", "function"],
				},
			],
		},
	},
];
```

### `includeNonExported`

When `true`, this rule also enforces TSDoc on supported non-exported top-level declarations.

Example flat config:

```ts
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
	{
		plugins: {
			"tsdoc-require-2": tsdocRequire,
		},
		rules: {
			"tsdoc-require-2/require": [
				"error",
				{
					includeNonExported: true,
				},
			],
		},
	},
];
```

## When Not To Use It

Disable this rule if your project intentionally does not require API documentation on exported declarations (or internal declarations when `includeNonExported` is enabled).

## Further Reading

- [TSDoc](https://tsdoc.org)
- [ESLint custom rule docs](https://eslint.org/docs/latest/extend/custom-rules)
