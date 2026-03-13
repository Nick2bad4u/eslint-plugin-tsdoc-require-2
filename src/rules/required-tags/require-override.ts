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

const RequireOverrideRule: TagRuleModule = createTagRule<
    TagRuleOptions,
    TagRuleMessageIds
>({
    create(context: TagRuleContext) {
        return createRequireTagRuleListener(context, "@override");
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
                "require @override tag in TSDoc blocks for exported TypeScript declarations and default exports.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags.md#require-override",
        },
        messages: {
            missingTag:
                "TSDoc for exported {{entityKind}} {{entityName}} must include @override.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require-override",
});

export default RequireOverrideRule;
