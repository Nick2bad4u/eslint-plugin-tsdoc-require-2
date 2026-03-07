import { RuleTester } from "@typescript-eslint/rule-tester";
import tsParser from "@typescript-eslint/parser";
import { afterAll, describe, it } from "vitest";

import rule from "../../../src/rules/require.js";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.itSkip = it.skip;

const ruleTester = new RuleTester({
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
});

ruleTester.run("require", rule, {
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
    invalid: [
        {
            code: "export class MyClass {}",
            errors: [
                {
                    messageId: "missingTSDoc",
                    data: {
                        entityKind: "class",
                        entityName: "MyClass",
                    },
                },
            ],
        },
        {
            code: "export function nonDocumentedFunction() { return true; }",
            errors: [
                {
                    messageId: "missingTSDoc",
                    data: {
                        entityKind: "function",
                        entityName: "nonDocumentedFunction",
                    },
                },
            ],
        },
        {
            code: "export type ShapeName = string;",
            errors: [
                {
                    messageId: "missingTSDoc",
                    data: {
                        entityKind: "type",
                        entityName: "ShapeName",
                    },
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
                    messageId: "missingTSDoc",
                    data: {
                        entityKind: "interface",
                        entityName: "Shape",
                    },
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
                    messageId: "missingTSDoc",
                    data: {
                        entityKind: "variable",
                        entityName: "createConfig",
                    },
                },
            ],
        },
        {
            code: "export default () => 1;",
            errors: [
                {
                    messageId: "missingTSDoc",
                    data: {
                        entityKind: "function",
                        entityName: "<default export>",
                    },
                },
            ],
        },
    ],
});
