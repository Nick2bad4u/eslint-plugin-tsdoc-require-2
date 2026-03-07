import { getPluginRule } from "../_internal/ruleTester.js";
import { createTypedRuleTester } from "../_internal/typed-rule-tester.js";

const ruleTester = createTypedRuleTester();

ruleTester.run("require", getPluginRule("require"), {
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
    ],
});
