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

/** Rule module for `tsdoc-require-2/require-import`. */
const RequireImportRule: TagRuleModule = createTagRule<
    TagRuleOptions,
    TagRuleMessageIds
>({
    create(context: TagRuleContext) {
        return createRequireTagRuleListener(context, "@import");
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
                "require @import tag in TSDoc blocks for supported TypeScript declarations and default exports.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags/require-import.md",
        },
        messages: {
            missingTag:
                "TSDoc for {{entityKind}} {{entityName}} must include @import.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require-import",
});

export default RequireImportRule;
