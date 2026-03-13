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

const RequireLinkRule: TagRuleModule = createTagRule<
    TagRuleOptions,
    TagRuleMessageIds
>({
    create(context: TagRuleContext) {
        return createRequireTagRuleListener(context, "@link");
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
                "require @link tag in TSDoc blocks for exported TypeScript declarations and default exports.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags.md#require-link",
        },
        messages: {
            missingTag:
                "TSDoc for exported {{entityKind}} {{entityName}} must include @link.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require-link",
});

export default RequireLinkRule;
