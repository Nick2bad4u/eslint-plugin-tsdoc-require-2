import {
    createRequireTagRuleListener,
    createTagRule,
    defaultRuleOptions,
    enforceableEntityKinds,
    optionSchema,
    type TagRuleContext,
    type TagRuleMessageIds,
    type TagRuleModule,
    type TagRuleOptions,
} from "../../internal/require-tag-factory.js";

const RequireThrowsRule: TagRuleModule = createTagRule<
    TagRuleOptions,
    TagRuleMessageIds
>({
    create(context: TagRuleContext) {
        return createRequireTagRuleListener(context, "@throws");
    },
    defaultOptions: defaultRuleOptions,
    meta: {
        defaultOptions: [
            {
                enforceFor: [...enforceableEntityKinds],
            },
        ],
        deprecated: false,
        docs: {
            description:
                "require @throws tag in TSDoc blocks for exported TypeScript declarations and default exports.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags.md#require-throws",
        },
        messages: {
            missingTag:
                "TSDoc for exported {{entityKind}} {{entityName}} must include @throws.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require-throws",
});

export default RequireThrowsRule;
