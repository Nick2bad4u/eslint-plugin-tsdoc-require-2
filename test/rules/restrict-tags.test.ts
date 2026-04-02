import restrictTagsRule from "../../src/rules/restrict-tags.js";
import { createTypedRuleTester } from "../_internal/typed-rule-tester.js";

const ruleTester = createTypedRuleTester();

ruleTester.run("restrict-tags", restrictTagsRule, {
    invalid: [
        {
            code: `/** @typedef MyType */\nexport default class MyClass {}`,
            errors: [
                {
                    data: {
                        entityKind: "class",
                        entityName: "MyClass",
                        tagName: "@typedef",
                    },
                    messageId: "disallowedTag",
                },
            ],
        },
        {
            code: `/** @typedef MyType */\nclass MyClass {}\nexport default MyClass;`,
            errors: [
                {
                    data: {
                        entityKind: "class",
                        entityName: "MyClass",
                        tagName: "@typedef",
                    },
                    messageId: "disallowedTag",
                },
            ],
        },
        {
            code: `/** @typedef MyType */\nexport default { a: 1 };`,
            errors: [
                {
                    data: {
                        entityKind: "object",
                        entityName: "<default export>",
                        tagName: "@typedef",
                    },
                    messageId: "disallowedTag",
                },
            ],
        },
        {
            code: `/** @typedef MyType */\nclass MyClass {}\nexport { MyClass };`,
            errors: [
                {
                    data: {
                        entityKind: "class",
                        entityName: "MyClass",
                        tagName: "@typedef",
                    },
                    messageId: "disallowedTag",
                },
            ],
        },
        {
            code: `/**
 * Creates a value.
 * @typedef ResultShape
 */
export function createValue(): number {
    return 1;
}`,
            errors: [
                {
                    data: {
                        entityKind: "function",
                        entityName: "createValue",
                        tagName: "@typedef",
                    },
                    messageId: "disallowedTag",
                },
            ],
        },
        {
            code: `/**
 * Creates a value.
 * @remarks Useful details.
 * @deprecated Use createValueV2.
 */
export function createValue(): number {
    return 1;
}`,
            errors: [
                {
                    data: {
                        allowedTags: "@remarks",
                        entityKind: "function",
                        entityName: "createValue",
                        tagName: "@deprecated",
                    },
                    messageId: "tagNotAllowed",
                },
            ],
            options: [
                {
                    mode: "allow",
                    tags: ["@remarks"],
                },
            ],
        },
        {
            code: `/**
 * Internal helper.
 * @extends InternalBase
 */
function internalCreateValue(): number {
    return 1;
}`,
            errors: [
                {
                    data: {
                        entityKind: "function",
                        entityName: "internalCreateValue",
                        tagName: "@extends",
                    },
                    messageId: "disallowedTag",
                },
            ],
            options: [
                {
                    includeNonExported: true,
                    mode: "deny",
                    tags: ["@extends"],
                },
            ],
        },
    ],
    valid: [
        {
            code: `export * from "foo";`,
        },
        {
            code: `export * as foo from "bar";`,
        },
        {
            code: `export { Foo } from "foo";`,
        },
        {
            code: `/**
 * Creates a value.
 * @remarks Useful details.
 */
export function createValue(): number {
    return 1;
}`,
        },
        {
            code: `/**
 * Creates a value.
 * @typedef ResultShape
 */
export function createValue(): number {
    return 1;
}`,
            options: [
                {
                    enforceFor: ["class"],
                },
            ],
        },
        {
            code: `/**
 * Creates a value.
 * @typedef ResultShape
 */
export function createValue(): number {
    return 1;
}`,
            options: [
                {
                    exportMode: "non-exported",
                    mode: "deny",
                    tags: ["@typedef"],
                },
            ],
        },
        {
            code: `/**
 * Internal helper.
 * @remarks Useful details.
 */
function internalCreateValue(): number {
    return 1;
}`,
            options: [
                {
                    exportMode: "non-exported",
                    mode: "allow",
                    tags: ["@remarks"],
                },
            ],
        },
    ],
});
