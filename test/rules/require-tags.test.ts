import {
    requiredTagDefinitions,
    type RequiredTagRuleName,
    requiredTagRules,
} from "../../src/rules/require-tag-rules.js";
import { createTypedRuleTester } from "../_internal/typed-rule-tester.js";

const ruleTester = createTypedRuleTester();

for (const { ruleName, tagName } of requiredTagDefinitions) {
    const typedRuleName = ruleName as RequiredTagRuleName;
    const ruleModule: (typeof requiredTagRules)[RequiredTagRuleName] =
        requiredTagRules[typedRuleName];

    const validWithTag = `/**\n * Description.\n * ${tagName}\n */\nexport function taggedFunction(value: string): string {\n    return value;\n}`;

    const invalidWithoutTag = `/**\n * Description.\n */\nexport function taggedFunction(value: string): string {\n    return value;\n}`;

    const validCases = [
        {
            code: validWithTag,
        },
        {
            code: invalidWithoutTag,
            options: [{ enforceFor: ["class"] as const }] as const,
        },
        {
            code: "export function withoutDoc(value: string): string { return value; }",
        },
        { code: `export * from "foo";` },
        { code: `export * as foo from "bar";` },
        { code: `export { Foo } from "foo";` },
    ];

    if (ruleName === "require-link") {
        validCases.push({
            code: `/**\n * Description.\n * {@link TaggedItem}\n */\nexport function taggedFunction(value: string): string {\n    return value;\n}`,
        });
    }

    if (ruleName === "require-label") {
        validCases.push({
            code: `/**\n * Description.\n * {@label stable}\n */\nexport function taggedFunction(value: string): string {\n    return value;\n}`,
        });
    }

    if (ruleName === "require-inherit-doc") {
        validCases.push({
            code: `/**\n * {@inheritDoc BaseTaggedFunction}\n */\nexport function taggedFunction(value: string): string {\n    return value;\n}`,
        });
    }

    if (ruleName === "require-include") {
        validCases.push({
            code: `/**\n * Description.\n * {@include ./snippets/api.md}\n */\nexport function taggedFunction(value: string): string {\n    return value;\n}`,
        });
    }

    ruleTester.run(typedRuleName, ruleModule, {
        invalid: [
            {
                code: `/** @description missing */\nclass MyClass {}\nexport { MyClass };`,
                errors: [
                    {
                        data: {
                            entityKind: "class",
                            entityName: "MyClass",
                            tagName,
                        },
                        messageId: "missingTag",
                    },
                ],
            },
            {
                code: `/** @description missing */\nexport default class {}\n`,
                errors: [
                    {
                        data: {
                            entityKind: "class",
                            entityName: "<default export>",
                            tagName,
                        },
                        messageId: "missingTag",
                    },
                ],
            },
            {
                code: `/** @description missing */\nexport default function() {}\n`,
                errors: [
                    {
                        data: {
                            entityKind: "function",
                            entityName: "<default export>",
                            tagName,
                        },
                        messageId: "missingTag",
                    },
                ],
            },
            {
                code: `/** @description missing */\nexport default {}\n`,
                errors: [
                    {
                        data: {
                            entityKind: "object",
                            entityName: "<default export>",
                            tagName,
                        },
                        messageId: "missingTag",
                    },
                ],
            },
            {
                code: invalidWithoutTag,
                errors: [
                    {
                        data: {
                            entityKind: "function",
                            entityName: "taggedFunction",
                            tagName,
                        },
                        messageId: "missingTag",
                    },
                ],
            },
        ],
        valid: validCases,
    });
}

ruleTester.run("require-remarks", requiredTagRules["require-remarks"], {
    invalid: [
        {
            code: `/**
 * Internal description.
 */
function internalTaggedFunction(value: string): string {
    return value;
}`,
            errors: [
                {
                    data: {
                        entityKind: "function",
                        entityName: "internalTaggedFunction",
                        tagName: "@remarks",
                    },
                    messageId: "missingTag",
                },
            ],
            options: [{ includeNonExported: true }],
        },
        {
            code: `/**
 * Internal description.
 */
function internalTaggedFunctionWithExportMode(value: string): string {
    return value;
}`,
            errors: [
                {
                    data: {
                        entityKind: "function",
                        entityName: "internalTaggedFunctionWithExportMode",
                        tagName: "@remarks",
                    },
                    messageId: "missingTag",
                },
            ],
            options: [{ exportMode: "non-exported" }],
        },
    ],
    valid: [
        {
            code: `/**
 * Internal description.
 * @remarks
 */
function internalTaggedFunction(value: string): string {
    return value;
}`,
            options: [{ includeNonExported: true }],
        },
        {
            code: `/**
 * Exported description.
 */
export function exportedTaggedFunction(value: string): string {
    return value;
}`,
            options: [{ exportMode: "non-exported" }],
        },
    ],
});

ruleTester.run(
    "require-module namespace targeting",
    requiredTagRules["require-module"],
    {
        invalid: [
            {
                code: `/**
 * Namespace docs.
 */
export namespace ApiDocs {
    export type Id = string;
}`,
                errors: [
                    {
                        data: {
                            entityKind: "namespace",
                            entityName: "ApiDocs",
                            tagName: "@module",
                        },
                        messageId: "missingTag",
                    },
                ],
                options: [{ enforceFor: ["namespace"] }],
            },
            {
                code: `/**
 * Internal namespace docs.
 */
namespace InternalDocs {
    export type Id = string;
}`,
                errors: [
                    {
                        data: {
                            entityKind: "namespace",
                            entityName: "InternalDocs",
                            tagName: "@module",
                        },
                        messageId: "missingTag",
                    },
                ],
                options: [
                    { enforceFor: ["namespace"], exportMode: "non-exported" },
                ],
            },
        ],
        valid: [
            {
                code: `/**
 * Namespace docs.
 * @module
 */
export namespace ApiDocs {
    export type Id = string;
}`,
                options: [{ enforceFor: ["namespace"] }],
            },
            {
                code: `/**
 * Exported namespace docs.
 */
export namespace ApiDocs {
    export type Id = string;
}`,
                options: [
                    { enforceFor: ["namespace"], exportMode: "non-exported" },
                ],
            },
        ],
    }
);
