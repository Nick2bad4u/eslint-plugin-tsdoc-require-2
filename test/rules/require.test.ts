import requireRule from "../../src/rules/require.js";
import { createTypedRuleTester } from "../_internal/typed-rule-tester.js";

const ruleTester = createTypedRuleTester();

ruleTester.run("require", requireRule, {
    invalid: [
        {
            code: "export class MyClass {}",
            errors: [
                {
                    data: {
                        entityKind: "class",
                        entityName: "MyClass",
                    },
                    messageId: "missingTSDoc",
                },
            ],
        },
        {
            code: "export function nonDocumentedFunction() { return true; }",
            errors: [
                {
                    data: {
                        entityKind: "function",
                        entityName: "nonDocumentedFunction",
                    },
                    messageId: "missingTSDoc",
                },
            ],
        },
        {
            code: "export type ShapeName = string;",
            errors: [
                {
                    data: {
                        entityKind: "type",
                        entityName: "ShapeName",
                    },
                    messageId: "missingTSDoc",
                },
            ],
        },
        {
            code: `
interface Shape {
  radius: number;
}

export { Shape };
`,
            errors: [
                {
                    data: {
                        entityKind: "interface",
                        entityName: "Shape",
                    },
                    messageId: "missingTSDoc",
                },
            ],
        },
        {
            code: `
const createConfig = () => ({ enabled: true });
export default createConfig;
`,
            errors: [
                {
                    data: {
                        entityKind: "variable",
                        entityName: "createConfig",
                    },
                    messageId: "missingTSDoc",
                },
            ],
        },
        {
            code: "export default () => 1;",
            errors: [
                {
                    data: {
                        entityKind: "function",
                        entityName: "<default export>",
                    },
                    messageId: "missingTSDoc",
                },
            ],
        },
        {
            code: "function internalHelper() { return true; }",
            errors: [
                {
                    data: {
                        entityKind: "function",
                        entityName: "internalHelper",
                    },
                    messageId: "missingTSDoc",
                },
            ],
            options: [
                {
                    includeNonExported: true,
                },
            ],
        },
        {
            code: 'export const API_TOKEN = "secret";',
            errors: [
                {
                    data: {
                        entityKind: "variable",
                        entityName: "API_TOKEN",
                    },
                    messageId: "missingTSDoc",
                },
            ],
            options: [
                {
                    enforceFor: ["variable"],
                },
            ],
        },
        {
            code: `
const localValue = 1;
export { localValue };
`,
            errors: [
                {
                    data: {
                        entityKind: "variable",
                        entityName: "localValue",
                    },
                    messageId: "missingTSDoc",
                },
            ],
            options: [
                {
                    enforceFor: ["variable"],
                    includeNonExported: true,
                },
            ],
        },
        {
            code: "export default ({ enabled: true });",
            errors: [
                {
                    data: {
                        entityKind: "object",
                        entityName: "<default export>",
                    },
                    messageId: "missingTSDoc",
                },
            ],
            options: [
                {
                    enforceFor: ["object"],
                },
            ],
        },
        {
            code: "export class ExplicitDefaultOptionsFallback {}",
            errors: [
                {
                    data: {
                        entityKind: "class",
                        entityName: "ExplicitDefaultOptionsFallback",
                    },
                    messageId: "missingTSDoc",
                },
            ],
            options: [{}],
        },
        {
            code: `
const localValue = 1;
export { localValue };
`,
            errors: [
                {
                    data: {
                        entityKind: "variable",
                        entityName: "localValue",
                    },
                    messageId: "missingTSDoc",
                },
            ],
            options: [
                {
                    enforceFor: ["variable"],
                },
            ],
        },
    ],
    valid: [
        {
            code: `
/** Public class docs. */
export class MyClass {}
`,
        },
        {
            code: `
class InternalOnly {}
`,
        },
        {
            code: `
/** Internal utility docs. */
function internalOnly(): boolean {
  return true;
}
`,
            options: [
                {
                    includeNonExported: true,
                },
            ],
        },
        {
            code: `
/** Public alias docs. */
export type UserId = string;
`,
        },
        {
            code: `
/** API shape docs. */
interface Shape {
  radius: number;
}

export { Shape };
`,
        },
        {
            code: `
/** Creates the default export object. */
const createConfig = () => ({ enabled: true });
export default createConfig;
`,
        },
        {
            code: `
/** Creates a documented default export function. */
export default function (): string {
  return "ok";
}
`,
        },
        {
            code: 'export const API_TOKEN = "secret";',
            options: [
                {
                    enforceFor: ["class"],
                },
            ],
        },
        {
            code: "export default () => 1;",
            options: [
                {
                    enforceFor: ["class"],
                },
            ],
        },
        {
            code: "export class MyClass {}",
            options: [
                {
                    enforceFor: [],
                },
            ],
        },
        {
            code: "export default () => 1;",
            options: [
                {
                    enforceFor: ["object"],
                },
            ],
        },
        {
            code: `
const localValue = 1;
export { localValue };
`,
            options: [
                {
                    enforceFor: ["class"],
                },
            ],
        },
    ],
});
