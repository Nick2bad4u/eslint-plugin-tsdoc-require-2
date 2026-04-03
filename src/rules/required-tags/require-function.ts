import {
    createRequireTagRuleListener,
    createTagRule,
    enforceableEntityKinds,
    optionSchema,
    type TagRuleContext,
    type TagRuleMessageIds,
    type TagRuleModule,
    type TagRuleOptions,
} from "../../internal/require-tag-factory.js";

/** Rule module for `tsdoc-require-2/require-function`. */
const RequireFunctionRule: TagRuleModule = createTagRule<
    TagRuleOptions,
    TagRuleMessageIds
>({
    create(context: TagRuleContext) {
        return createRequireTagRuleListener(context, "@function");
    },
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
                "require @function tag in TSDoc blocks for supported TypeScript declarations and default exports.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags/require-function.md",
        },
        messages: {
            missingTag:
                "TSDoc for {{entityKind}} {{entityName}} must include @function.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require-function",
});

export default RequireFunctionRule;
