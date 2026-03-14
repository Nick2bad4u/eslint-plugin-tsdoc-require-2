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

const RequireSealedRule: TagRuleModule = createTagRule<
    TagRuleOptions,
    TagRuleMessageIds
>({
    create(context: TagRuleContext) {
        return createRequireTagRuleListener(context, "@sealed");
    },
    defaultOptions: defaultRuleOptions,
    meta: {
        defaultOptions: [
            {
                enforceFor: [...enforceableEntityKinds],
                includeNonExported: false,
            },
        ],
        deprecated: false,
        docs: {
            description:
                "require @sealed tag in TSDoc blocks for TypeScript declarations and default exports.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags/require-sealed.md",
        },
        messages: {
            missingTag:
                "TSDoc for {{entityKind}} {{entityName}} must include @sealed.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require-sealed",
});

export default RequireSealedRule;
