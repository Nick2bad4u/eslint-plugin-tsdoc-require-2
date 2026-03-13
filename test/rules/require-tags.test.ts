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
    ];

    if (ruleName === "require-link") {
        validCases.push({
            code: `/**\n * Description.\n * {@link TaggedItem}\n */\nexport function taggedFunction(value: string): string {\n    return value;\n}`,
        });
    }

    ruleTester.run(typedRuleName, ruleModule, {
        invalid: [
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
