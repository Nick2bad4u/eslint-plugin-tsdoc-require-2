# tsdoc-require/require

Requires TSDoc comments for exported TypeScript declarations and default exports.

## Rule Details

This rule reports exported declarations that do not have a TSDoc block comment (`/** ... */`) directly above them.

It checks:

- exported classes
- exported functions
- exported interfaces
- exported type aliases
- exported enums
- exported variables
- default exports (including default-exported identifiers)

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

This rule has no options.

## When Not To Use It

Disable this rule if your project intentionally does not require API documentation on exported declarations.

## Further Reading

- [TSDoc](https://tsdoc.org)
- [ESLint custom rule docs](https://eslint.org/docs/latest/extend/custom-rules)
