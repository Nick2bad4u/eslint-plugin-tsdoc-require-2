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

const RequireBetaRule: TagRuleModule = createTagRule<
    TagRuleOptions,
    TagRuleMessageIds
>({
    create(context: TagRuleContext) {
        return createRequireTagRuleListener(context, "@beta");
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
                "require @beta tag in TSDoc blocks for exported TypeScript declarations and default exports.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags.md#require-beta",
        },
        messages: {
            missingTag:
                "TSDoc for exported {{entityKind}} {{entityName}} must include @beta.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require-beta",
});

export default RequireBetaRule;
